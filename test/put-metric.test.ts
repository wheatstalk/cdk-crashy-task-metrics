import * as fs from 'fs';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const putMetric = require('../functions/put-metric');

test('getMetricData', () => {
  process.env.METRIC_NAME = 'Test';

  // GIVEN
  const event = getEventJson('ecs-service-task-crashed-event.json');

  // WHEN
  const metricData = putMetric.mapEventToMetricData('Test', event);

  // THEN
  expect(metricData).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        MetricName: 'Test',
        Value: 1,
        Dimensions: [
          {
            Name: 'clusterArn',
            Value: 'arn:aws:ecs:ca-central-1:111111111111111:cluster/ItLit-ClusterEB0386A7-nWUaxKV2PwyD',
          },
          {
            Name: 'group',
            Value: 'service:ItLit-ServiceD69D759B-XPamf8hcC1FO',
          },
        ],
      }),
    ],
    ));
});

function getEventJson(name: string) {
  const eventFile = path.join(__dirname, 'events', name);
  const eventJson = fs.readFileSync(eventFile).toString();
  return JSON.parse(eventJson);
}