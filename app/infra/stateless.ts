import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as events from "aws-cdk-lib/aws-events";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";

import { Construct } from "constructs";
import { Tracing } from "aws-cdk-lib/aws-lambda";

export interface ConsumerProps extends cdk.StackProps {
  accountsTable: dynamodb.Table;
  accountsEventBus: events.EventBus;
}

export class BankCustomersStatelessStack extends cdk.Stack {
  private readonly accountsTable: dynamodb.Table;
  private readonly accountsEventBus: events.EventBus;

  constructor(scope: Construct, id: string, props: ConsumerProps) {
    super(scope, id, props);

    this.accountsTable = props.accountsTable;
    this.accountsEventBus = props.accountsEventBus;

    const lambdaPowerToolsConfig = {
      LOG_LEVEL: "DEBUG",
      POWERTOOLS_LOGGER_LOG_EVENT: "true",
      POWERTOOLS_LOGGER_SAMPLE_RATE: "0.5",
      POWERTOOLS_TRACE_ENABLED: "enabled",
      POWERTOOLS_TRACER_CAPTURE_HTTPS_REQUESTS: "captureHTTPsRequests",
      POWERTOOLS_TRACER_CAPTURE_RESPONSE: "captureResult",
      POWERTOOLS_METRICS_NAMESPACE: "BankCustomers",
    };

    const createAccountLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, "CreateAccountLambda", {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.join(
          __dirname,
          "src/adapters/handlers/create-customer-account/create-customer-account.adapter.ts"
        ),
        memorySize: 1024,
        handler: "handler",
        tracing: Tracing.ACTIVE,
        bundling: {
          minify: true,
          externalModules: ["aws-sdk"],
        },
        environment: {
          TABLE_NAME: this.accountsTable.tableName,
          EVENT_BUS: this.accountsEventBus.eventBusArn,
          POWERTOOLS_SERVICE_NAME: "CreateAccountLambda",
          ...lambdaPowerToolsConfig,
        },
      });

    const retrieveAccountLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, "RetrieveAccountLambda", {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.join(
          __dirname,
          "src/adapters/handlers/retrieve-customer-account/retrieve-customer-account.adapter.ts"
        ),
        memorySize: 1024,
        tracing: Tracing.ACTIVE,
        handler: "handler",
        bundling: {
          minify: true,
          externalModules: ["aws-sdk"],
        },
        environment: {
          TABLE_NAME: this.accountsTable.tableName,
          EVENT_BUS: this.accountsEventBus.eventBusArn,
          POWERTOOLS_SERVICE_NAME: "RetrieveAccountLambda",
          ...lambdaPowerToolsConfig,
        },
      });

    this.accountsTable.grantWriteData(createAccountLambda);
    this.accountsTable.grantReadData(retrieveAccountLambda);

    this.accountsEventBus.grantPutEventsTo(createAccountLambda);

    const accountsApi: apigw.RestApi = new apigw.RestApi(this, "AccountsApi", {
      description: "Bank Customers Accounts API",
      deploy: true,
      deployOptions: {
        stageName: process.env.STAGE,
        loggingLevel: apigw.MethodLoggingLevel.INFO,
      },
    });

    const accounts: apigw.Resource = accountsApi.root.addResource("accounts");
    const account: apigw.Resource = accounts.addResource("{id}");

    accounts.addMethod(
      "POST",
      new apigw.LambdaIntegration(createAccountLambda, {
        proxy: true,
      })
    );

    account.addMethod(
      "GET",
      new apigw.LambdaIntegration(retrieveAccountLambda, {
        proxy: true,
      })
    );
  }
}
