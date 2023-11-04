import { awsLambdaFastify } from "@fastify/aws-lambda";
import { server } from "./server";

const proxy = awsLambdaFastify(server);

exports.handler = proxy;
