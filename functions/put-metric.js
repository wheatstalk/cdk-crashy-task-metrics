const AWS = require('aws-sdk');

// Handlers
exports.putTaskCrashedMetric = putTaskCrashedMetric;

// Testing
exports.mapEventToMetricData = mapEventToMetricData;



async function putTaskCrashedMetric(event, context) {
  console.log('event =', event);

  const cloudWatchClient = new AWS.CloudWatch();

  await cloudWatchClient.putMetricData({
    Namespace: event.metricNamespace,
    MetricData: mapEventToMetricData(event.metricName, event.ecsTaskStateChangeEvent),
  }).promise();

  return "OK";
}

/**
 * @returns {AWS.CloudWatch.MetricDatum[]}
 */
function mapEventToMetricData(metricName, ecsTaskStateChangeEvent) {
  return [
    {
      MetricName: metricName,
      Value: 1,
      Dimensions: [
        { Name: 'clusterArn', Value: ecsTaskStateChangeEvent.detail.clusterArn },
        { Name: 'group', Value: ecsTaskStateChangeEvent.detail.group },
      ],
    },
  ];
}