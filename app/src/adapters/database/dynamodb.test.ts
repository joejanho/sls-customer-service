import {
  createAccount,
  retrieveAccount,
  updateAccount,
} from "app/src/adapters/database/dynamodb";

import { CustomerAccountDto } from "app/src/dto/customer-account";
import { awsSdkGetPromiseResponse } from "../../../../__mocks__/aws-sdk";

let customerAccount: CustomerAccountDto;

describe("database-adapter", () => {
  beforeEach(() => {
    customerAccount = {
      id: "1",
      firstName: "joe",
      surname: "janho",
      created: "created",
      updated: "updated",
    };
  });

  describe("create-account", () => {
    it("should return the correct dto", async () => {
      await expect(createAccount(customerAccount)).resolves
        .toMatchInlineSnapshot(`
Object {
  "created": "created",
  "firstName": "joe",
  "id": "1",
  "surname": "janho",
  "updated": "updated",
}
`);
    });
  });

  describe("update-account", () => {
    it("should return the correct dto", async () => {
      await expect(updateAccount(customerAccount)).resolves
        .toMatchInlineSnapshot(`
Object {
  "created": "created",
  "firstName": "joe",
  "id": "1",
  "surname": "janho",
  "updated": "updated",
}
`);
    });
  });

  describe("retrieve-account", () => {
    it("should return the correct dto", async () => {
      // arrange
      awsSdkGetPromiseResponse.mockResolvedValueOnce({
        Item: {
          ...customerAccount,
        },
      });
      await expect(retrieveAccount(customerAccount.id)).resolves
        .toMatchInlineSnapshot(`
Object {
  "created": "created",
  "firstName": "joe",
  "id": "1",
  "surname": "janho",
  "updated": "updated",
}
`);
    });
  });
});
