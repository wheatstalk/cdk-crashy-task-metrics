import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { ItDev } from '../../src/it/it-dev';

test('snapshot', () => {
  const app = new cdk.App();
  const stack = new ItDev(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});