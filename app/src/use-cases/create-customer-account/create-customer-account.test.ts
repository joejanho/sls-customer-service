import * as createCustomerAccount from "app/src/repositories/create-customer-account-repository/create-customer-account-repository";
import * as publishDomainEvents from "app/src/repositories/publish-event-recipient/publish-event-recipient";

import { CustomerAccount } from "app/src/domain/customer-account";
import { CustomerAccountDto } from "app/src/dto/customer-account";
import { createCustomerAccountUseCase } from "app/src/use-cases/create-customer-account/create-customer-account";

let customerAccountDto: CustomerAccountDto;

describe("create-customer-use-case", () => {
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
      .spyOn(createCustomerAccount, "createCustomerAccount")
      .mockResolvedValue(createdAccount);

    jest.spyOn(publishDomainEvents, "publishDomainEvents").mockResolvedValue();
  });

  it("should return the correct dto on success", async () => {
    // act
    const response = await createCustomerAccountUseCase(customerAccountDto);
    // arrange / assert
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
