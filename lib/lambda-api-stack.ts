import * as cdk from 'aws-cdk-lib'
import * as route53 from 'aws-cdk-lib/aws-route53'
import type { Construct } from 'constructs'

interface LambdaApiStackProps extends cdk.StackProps {
  hostedZoneName: string
}

export class LambdaApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaApiStackProps) {
    super(scope, id, props)
    const { hostedZoneName } = props

    // Route 53: Hosted Zone
    new route53.HostedZone(this, 'HostedZone', {
      zoneName: hostedZoneName,
    })
  }
}
