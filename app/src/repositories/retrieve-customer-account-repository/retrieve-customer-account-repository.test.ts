import * as retrieveAccount from "app/src/adapters/database/dynamodb";

import { CustomerAccountDto } from "app/src/dto/customer-account";
import { retrieveCustomerAccount } from "app/src/repositories/retrieve-customer-account-repository/retrieve-customer-account-repository";

describe("retrieve-customer-account-repository", () => {
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

    const customerId = "1";

    jest
      .spyOn(retrieveAccount, "retrieveAccount")
      .mockResolvedValue(customerAccountProps);

    await expect(retrieveCustomerAccount(customerId)).resolves
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
