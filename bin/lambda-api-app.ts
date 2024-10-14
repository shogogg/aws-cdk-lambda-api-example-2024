#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import * as dotenv from 'dotenv'
import { LambdaApiStack } from '../lib/lambda-api-stack'

// Load environment variables from .env file
dotenv.config()

const account = process.env.APP_AWS_ACCOUNT ?? process.env.CDK_DEFAULT_ACCOUNT
const region = process.env.APP_AWS_REGION ?? process.env.CDK_DEFAULT_REGION
const appName = process.env.APP_NAME ?? 'ExampleApp'
const hostedZoneName = process.env.APP_HOSTED_ZONE_NAME ?? 'example.com'
const domainName = process.env.APP_DOMAIN_NAME ?? 'api.example.com'

const app = new cdk.App()

new LambdaApiStack(app, `${appName}LambdaApiStack`, {
  env: {
    account,
    region,
  },
  hostedZoneName,
  domainName,
})
