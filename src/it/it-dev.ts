import * as cdk from '@aws-cdk/core';

/** @internal */
export class ItDev extends cdk.Stack {
  constructor(scope: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope, 'ItDev', props);

    new cdk.CfnOutput(this, 'Output', {
      value: 'Hello Me',
    });
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new ItDev(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}