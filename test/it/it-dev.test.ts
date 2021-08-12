import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { ItLit } from '../../src/it/it-lit';

test('snapshot', () => {
  const app = new cdk.App();
  const stack = new ItLit(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

