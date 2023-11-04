import * as cdk from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import path = require("path");

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, "trpc-stack-sample-lambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../../server/src/lambda.ts"),
      handler: "handler",
      timeout: cdk.Duration.seconds(3),
      bundling: {
        forceDockerBundling: false,
      },
    });
  }
}
