import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as ecs from '@aws-cdk/aws-ecs';
import * as cdk from '@aws-cdk/core';
import { CrashyTaskMetrics } from '../crashy-task-metrics';

/** @internal */
export class ItLit extends cdk.Stack {
  constructor(scope_: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope_, 'ItLit', props);

    const cluster = new ecs.Cluster(this, 'Cluster');

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDefinition', {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    // A crashy container
    taskDefinition.addContainer('crashy', {
      image: ecs.ContainerImage.fromRegistry('alpine:3'),
      command: ['sh', '-c', 'sleep 5 && exit 1'],
    });

    const service = new ecs.FargateService(this, 'Service', {
      cluster,
      taskDefinition,
      desiredCount: 0,
      minHealthyPercent: 0,
      maxHealthyPercent: 500,
    });

    const scope = this;

    // ::SNIP
    const crashyTaskMetrics = new CrashyTaskMetrics(scope, 'ServiceMetrics', {
      service,
    });

    const crashAlarm = crashyTaskMetrics
      // Two crashes in five minutes
      .metricTaskCrashes({ period: cdk.Duration.minutes(5) })
      .createAlarm(scope, 'CrashAlarm', {
        comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
        evaluationPeriods: 1,
        threshold: 2,
        treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      });
    // ::END-SNIP

    new cdk.CfnOutput(this, 'CrashAlarmName', {
      value: crashAlarm.alarmName,
    });
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new ItLit(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}

/**
 * To test,
 */