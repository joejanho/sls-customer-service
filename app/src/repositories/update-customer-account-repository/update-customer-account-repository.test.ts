import * as updateAccount from "app/src/adapters/database/dynamodb";

import { CustomerAccount } from "app/src/domain/customer-account";
import { CustomerAccountDto } from "app/src/dto/customer-account";
import { updateCustomerAccount } from "app/src/repositories/update-customer-account-repository/update-customer-account-repository";

describe("update-customer-account-repository", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should return the correct customer domain object", async () => {
    // arrange
    const customerAccountProps: CustomerAccountDto = {
      id: "1",
      firstName: "joe",
      surname: "janho",
      created: "created",
      updated: "updated",
    };

    const customer: CustomerAccount =
      CustomerAccount.createAccount(customerAccountProps);

    jest
      .spyOn(updateAccount, "updateAccount")
      .mockResolvedValue(customerAccountProps);

    await expect(updateCustomerAccount(customer)).resolves
      .toMatchInlineSnapshot(`
CustomerAccount {
  "_created": "created",
  "_domainEvents": Array [],
  "_id": "1",
  "_updated": "updated",
  "props": Object {
    "created": "created",
    "firstName": "joe",
    "id": "1",
    "surname": "janho",
    "updated": "updated",
  },
}
`);
  });
});
