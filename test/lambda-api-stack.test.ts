import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { beforeAll, describe, it } from 'vitest'
import { LambdaApiStack } from '../lib/lambda-api-stack'

describe('LambdaApiStack', () => {
  let template: Template

  beforeAll(() => {
    const app = new cdk.App()
    const stack = new LambdaApiStack(app, 'TestStack', {
      hostedZoneName: 'example.org',
    })
    template = Template.fromStack(stack)
  })

  it('has lambda function', () => {
    template.resourceCountIs('AWS::Lambda::Function', 1)
  })

  it('has lambda function with the specified runtime', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs20.x',
    })
  })

  it('has hosted zone', () => {
    template.resourceCountIs('AWS::Route53::HostedZone', 1)
  })

  it('has hosted zone with the specified name', () => {
    template.hasResourceProperties('AWS::Route53::HostedZone', {
      Name: 'example.org.',
    })
  })
})
