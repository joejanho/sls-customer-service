import * as createCustomerAccountUseCase from "app/src/use-cases/create-customer-account/create-customer-account";

import {
  CustomerAccountDto,
  NewCustomerAccountDto,
} from "app/src/dto/customer-account";
import { NewCustomerAccountProps } from "app/src/models/customer-account-types";

import { APIGatewayProxyEvent } from "aws-lambda";
import { createCustomerAccountAdapter } from "app/src/adapters/handlers/create-customer-account/create-customer-account.handler";

let event: Partial<APIGatewayProxyEvent>;
let customerAccount: CustomerAccountDto;

describe("create-customer-account-handler", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    customerAccount = {
      id: "1",
      firstName: "joe",
      surname: "janho",
      created: "created",
      updated: "updated",
    };

    jest
      .spyOn(createCustomerAccountUseCase, "createCustomerAccountUseCase")
      .mockResolvedValue(customerAccount);

    const payload: NewCustomerAccountDto = {
      firstName: "joe",
      surname: "janho",
    };

    event = {
      body: JSON.stringify(payload),
    };
  });

  it("should return the correct response on success", async () => {
    // act & assert
    await expect(createCustomerAccountAdapter(event as any)).resolves
      .toMatchInlineSnapshot(`
Object {
  "body": "{\\"id\\":\\"1\\",\\"firstName\\":\\"joe\\",\\"surname\\":\\"janho\\",\\"created\\":\\"created\\",\\"updated\\":\\"updated\\"}",
  "statusCode": 201,
}
`);
  });

  it("should throw a validation error if the payload is invalid", async () => {
    // arrange
    const payload: NewCustomerAccountProps = {
      firstName: "", // invalid
      surname: "janho",
    };

    event = {
      body: JSON.stringify(payload),
    };

    // act & assert
    await expect(createCustomerAccountAdapter(event as any)).resolves
      .toMatchInlineSnapshot(`
Object {
  "body": "\\"[{\\\\\\"instancePath\\\\\\":\\\\\\"/firstName\\\\\\",\\\\\\"schemaPath\\\\\\":\\\\\\"#/properties/firstName/pattern\\\\\\",\\\\\\"keyword\\\\\\":\\\\\\"pattern\\\\\\",\\\\\\"params\\\\\\":{\\\\\\"pattern\\\\\\":\\\\\\"^[a-zA-Z]+$\\\\\\"},\\\\\\"message\\\\\\":\\\\\\"must match pattern \\\\\\\\\\\\\\"^[a-zA-Z]+$\\\\\\\\\\\\\\"\\\\\\"}]\\"",
  "statusCode": 400,
}
`);
  });

  it("should return the correct response on error", async () => {
    // arrange
    event = {} as any;

    // act & assert
    await expect(createCustomerAccountAdapter(event as any)).resolves
      .toMatchInlineSnapshot(`
Object {
  "body": "\\"no order body\\"",
  "statusCode": 400,
}
`);
  });
});
