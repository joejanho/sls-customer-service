import * as createAccount from "app/src/adapters/database/dynamodb";

import { CustomerAccount } from "app/src/domain/customer-account";
import { NewCustomerAccountProps } from "app/src/models/customer-account-types";
import { createCustomerAccount } from "app/src/repositories/create-customer-account-repository";

describe("create-customer-account-repository", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2023-01-01"));
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should return the correct customer domain object", async () => {
    // arrange
    const customerAccountProps: NewCustomerAccountProps = {
      firstName: "joe",
      surname: "janho",
    };

    const customer: CustomerAccount =
      CustomerAccount.createAccount(customerAccountProps);

    jest.spyOn(createAccount, "createAccount").mockResolvedValue({
      ...customer.toDto(),
    });

    await expect(createCustomerAccount(customer)).resolves
      .toMatchInlineSnapshot(`
CustomerAccount {
  "_created": "2023-01-01T00:00:00.000Z",
  "_domainEvents": Array [],
  "_id": "f39e49ad-8f88-448f-8a15-41d560ad6d70",
  "_updated": "2023-01-01T00:00:00.000Z",
  "props": Object {
    "created": "2023-01-01T00:00:00.000Z",
    "firstName": "joe",
    "id": "f39e49ad-8f88-448f-8a15-41d560ad6d70",
    "surname": "janho",
    "updated": "2023-01-01T00:00:00.000Z",
  },
}
`);
  });
});
