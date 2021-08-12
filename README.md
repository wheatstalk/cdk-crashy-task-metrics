# CDK Crashy Task Metrics

Use this CDK construct to detect and alarm when ECS tasks crash more than they
should.

## Example

```ts
// Create CrashyTaskMetrics for an ECS service
const crashyTaskMetrics = new CrashyTaskMetrics(this, 'CrashyTaskMetrics', {
  service,
});

// Create alarm for more than two crashes in five minutes.
const crashAlarm = crashyTaskMetrics
  .metricTaskCrashes({ period: cdk.Duration.minutes(5) })
  .createAlarm(this, 'CrashAlarm', {
    comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
    evaluationPeriods: 1,
    threshold: 2,
  });
```