import * as retrieveCustomerAccount from "app/src/repositories/retrieve-customer-account-repository/retrieve-customer-account-repository";

import { CustomerAccount } from "app/src/domain/customer-account";
import { CustomerAccountDto } from "app/src/dto/customer-account";
import { retrieveCustomerAccountUseCase } from "app/src/use-cases/retrieve-customer-account/retrieve-customer-account";

let customerAccountDto: CustomerAccountDto;

describe("retrieve-customer-use-case", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2022-01-01"));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    customerAccountDto = {
      id: "1",
      firstName: "joe",
      surname: "janho",
      created: "created",
      updated: "updated",
    };

    const createdAccount: CustomerAccount =
      CustomerAccount.createAccount(customerAccountDto);

    jest
      .spyOn(retrieveCustomerAccount, "retrieveCustomerAccount")
      .mockResolvedValue(createdAccount);
  });

  it("should return the correct dto on success", async () => {
    // arrange
    const customerId = "1";
    const response = await retrieveCustomerAccountUseCase(customerId);

    // act / assert
    expect(response).toMatchInlineSnapshot(`
Object {
  "created": "2022-01-01T00:00:00.000Z",
  "firstName": "joe",
  "id": "f39e49ad-8f88-448f-8a15-41d560ad6d70",
  "surname": "janho",
  "updated": "2022-01-01T00:00:00.000Z",
}
`);
  });
});
