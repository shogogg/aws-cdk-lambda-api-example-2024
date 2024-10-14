import * as cdk from 'aws-cdk-lib'
import * as apiGateway from 'aws-cdk-lib/aws-apigateway'
import * as certificationManager from 'aws-cdk-lib/aws-certificatemanager'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets'
import type { Construct } from 'constructs'

interface LambdaApiStackProps extends cdk.StackProps {
  hostedZoneName: string
  domainName: string
}

export class LambdaApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaApiStackProps) {
    super(scope, id, props)
    const { hostedZoneName, domainName } = props

    // Lambda: Function
    const apiFunction = new lambdaNodejs.NodejsFunction(this, 'app', {
      runtime: lambda.Runtime.NODEJS_20_X,
    })

    // API Gateway: Routing
    const api = new apiGateway.RestApi(this, 'ApiGateway')
    api.root.addResource('example').addMethod('GET', new apiGateway.LambdaIntegration(apiFunction))

    // Route 53: Hosted Zone
    const hostedZone = new route53.HostedZone(this, 'HostedZone', {
      zoneName: hostedZoneName,
    })

    // ACM: Certificate
    const certificate = new certificationManager.Certificate(this, 'Certificate', {
      domainName,
      validation: certificationManager.CertificateValidation.fromDns(hostedZone),
    })

    // API Gateway: Custom Domain
    const customDomain = new apiGateway.DomainName(this, 'CustomDomain', {
      domainName,
      certificate,
      securityPolicy: apiGateway.SecurityPolicy.TLS_1_2,
      endpointType: apiGateway.EndpointType.REGIONAL,
    })
    customDomain.addBasePathMapping(api)

    // Route 53: Record
    new route53.ARecord(this, 'ARecord', {
      zone: hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(new route53Targets.ApiGatewayDomain(customDomain)),
    })
  }
}
