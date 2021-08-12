import * as path from 'path';
import * as cw from '@aws-cdk/aws-cloudwatch';
import * as ecs from '@aws-cdk/aws-ecs';
import * as events from '@aws-cdk/aws-events';
import * as events_targets from '@aws-cdk/aws-events-targets';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';

/**
 * Props for `CrashyTaskMetrics`.
 */
export interface CrashyTaskMetricsProps {
  /**
   * ECS service to report metrics on.
   */
  readonly service: ecs.FargateService | ecs.Ec2Service;

  /**
   * Metric namespace.
   * @default 'cdk-crashy-task-metrics'
   */
  readonly metricNamespace?: string;

  /**
   * Metric name.
   * @default 'TaskCrashes'
   */
  readonly metricName?: string;
}

/**
 * Provide metrics for crashy tasks run by an ECS Service.
 */
export class CrashyTaskMetrics extends cdk.Construct {
  private readonly metricNamespace: string;
  private readonly metricName: string;
  private readonly service: ecs.FargateService | ecs.Ec2Service;

  constructor(scope: cdk.Construct, id: string, props: CrashyTaskMetricsProps) {
    super(scope, id);

    // Defaults
    this.metricNamespace = props.metricNamespace ?? 'cdk-crashy-task-metrics';
    this.metricName = props.metricName ?? 'TaskCrashes';
    this.service = props.service;

    const putMetricFunction = new lambda.Function(this, 'PutMetricFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'put-metric.putTaskCrashedMetric',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', 'functions')),
      initialPolicy: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          resources: ['*'],
          actions: ['cloudwatch:PutMetricData'],
        }),
      ],
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    new events.Rule(this, 'TaskCrashed', {
      eventPattern: renderEventPattern(props.service),
      targets: [new events_targets.LambdaFunction(putMetricFunction, {
        event: events.RuleTargetInput.fromObject({
          metricNamespace: this.metricNamespace,
          metricName: this.metricName,
          ecsTaskStateChangeEvent: events.EventField.fromPath('$'),
        }),
      })],
    });
  }

  /**
   * Provide a metric for task crashes.
   * @param props
   */
  metricTaskCrashes(props: cw.MetricOptions = {}): cw.Metric {
    return new cw.Metric({
      namespace: this.metricNamespace,
      metricName: this.metricName,
      dimensionsMap: {
        clusterArn: this.service.cluster.clusterArn,
        group: cdk.Fn.join(':', ['service', this.service.serviceName]),
      },
      statistic: 'sum',
      ...props,
    });
  }
}

function renderEventPattern(service: ecs.IService) {
  return {
    source: ['aws.ecs'],
    detailType: ['ECS Task State Change'],
    detail: {
      lastStatus: ['STOPPED'],
      group: [cdk.Fn.join(':', ['service', service.serviceName])],
      stoppedReason: [{
        'anything-but': {
          prefix: 'Scaling activity',
        },
      }],
    },
  };
}