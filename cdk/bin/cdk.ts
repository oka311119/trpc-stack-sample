import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/cdk-stack";
import * as dotenv from "dotenv";

dotenv.config();

const app = new cdk.App();
new CdkStack(app, "TrpcStackSample", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
