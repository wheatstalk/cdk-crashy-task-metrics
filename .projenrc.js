const { AwsCdkConstructLibrary } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Josh Kellendonk',
  authorAddress: 'joshkellendonk@gmail.com',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: '@wheatstalk/cdk-crashy-task-metrics',
  repositoryUrl: 'https://github.com/wheatstalk/cdk-crashy-task-metrics.git',

  releaseEveryCommit: true,
  releaseToNpm: true,

  projenUpgradeSecret: 'YARN_UPGRADE_TOKEN',
  autoApproveUpgrades: true,
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['github-actions', 'github-actions[bot]', 'misterjoshua'],
  },

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-iam',
  ],

  devDeps: [
    'ts-node@^9',
    'aws-cdk@^1.95.2',
    'aws-sdk@^2',
  ],

  gitignore: [
    'cdk.out',
    '.idea',
    '*.iml',
    'cdk.context.json',
  ],

  npmignore: [
    'cdk.out',
    '.idea',
    '*.iml',
    'cdk.context.json',
  ],

  // cdkDependencies: undefined,        /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,    /* AWS CDK modules required for testing. */
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});
project.package.setScript('it:lit', 'cdk --app "ts-node -P tsconfig.eslint.json src/it/it-lit.ts"');
project.synth();
