import * as cdk from 'aws-cdk-lib'
import type { Construct } from 'constructs'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkExampleStack extends cdk.Stack {
  // biome-ignore lint/complexity/noUselessConstructor: This is a template
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkExampleQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
