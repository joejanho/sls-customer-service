#!/usr/bin/env node

import "source-map-support/register";

import * as cdk from "aws-cdk-lib";

import { BankCustomersStatefulStack } from "../stateful/stateful";
import { BankCustomersStatelessStack } from "../app/stateless";

const app = new cdk.App();
const statefulStack = new BankCustomersStatefulStack(
  app,
  "BankCustomersStatefulStack-" + process.env.STAGE,
  {}
);
new BankCustomersStatelessStack(
  app,
  "BankStatelessStack-" + process.env.STAGE,
  {
    accountsTable: statefulStack.accountsTable,
    accountsEventBus: statefulStack.accountsEventBus,
  }
);
