# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### CrashyTaskMetrics <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetrics"></a>

Provide metrics for crashy tasks run by an ECS Service.

#### Initializers <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetrics.Initializer"></a>

```typescript
import { CrashyTaskMetrics } from '@wheatstalk/cdk-crashy-task-metrics'

new CrashyTaskMetrics(scope: Construct, id: string, props: CrashyTaskMetricsProps)
```

##### `scope`<sup>Required</sup> <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetrics.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetrics.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetrics.parameter.props"></a>

- *Type:* [`@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetricsProps`](#@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetricsProps)

---

#### Methods <a name="Methods"></a>

##### `metricTaskCrashes` <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetrics.metricTaskCrashes"></a>

```typescript
public metricTaskCrashes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetrics.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---




## Structs <a name="Structs"></a>

### CrashyTaskMetricsProps <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetricsProps"></a>

Props for `CrashyTaskMetrics`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CrashyTaskMetricsProps } from '@wheatstalk/cdk-crashy-task-metrics'

const crashyTaskMetricsProps: CrashyTaskMetricsProps = { ... }
```

##### `service`<sup>Required</sup> <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetricsProps.property.service"></a>

- *Type:* [`@aws-cdk/aws-ecs.FargateService`](#@aws-cdk/aws-ecs.FargateService) | [`@aws-cdk/aws-ecs.Ec2Service`](#@aws-cdk/aws-ecs.Ec2Service)

ECS service to report metrics on.

---

##### `metricName`<sup>Optional</sup> <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetricsProps.property.metricName"></a>

- *Type:* `string`
- *Default:* 'TaskCrashes'

Metric name.

---

##### `metricNamespace`<sup>Optional</sup> <a name="@wheatstalk/cdk-crashy-task-metrics.CrashyTaskMetricsProps.property.metricNamespace"></a>

- *Type:* `string`
- *Default:* 'cdk-crashy-task-metrics'

Metric namespace.

---



