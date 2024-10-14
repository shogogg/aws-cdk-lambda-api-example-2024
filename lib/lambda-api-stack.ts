import * as cdk from 'aws-cdk-lib'
import * as apiGateway from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as route53 from 'aws-cdk-lib/aws-route53'
import type { Construct } from 'constructs'

interface LambdaApiStackProps extends cdk.StackProps {
  hostedZoneName: string
}

export class LambdaApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaApiStackProps) {
    super(scope, id, props)
    const { hostedZoneName } = props

    // Lambda: Function
    const apiFunction = new lambdaNodejs.NodejsFunction(this, 'app', {
      runtime: lambda.Runtime.NODEJS_20_X,
    })

    // API Gateway: Routing
    const api = new apiGateway.RestApi(this, 'ApiGateway')
    api.root.addResource('example').addMethod('GET', new apiGateway.LambdaIntegration(apiFunction))

    // Route 53: Hosted Zone
    new route53.HostedZone(this, 'HostedZone', {
      zoneName: hostedZoneName,
    })
  }
}
