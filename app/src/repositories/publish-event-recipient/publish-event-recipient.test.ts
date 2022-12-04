import * as publishEvent from "app/src/adapters/events/event-bus";

import { CustomerAccount } from "app/src/domain/customer-account";
import { NewCustomerAccountProps } from "app/src/models/customer-account-types";
import { publishDomainEvents } from "app/src/repositories/publish-event-recipient/publish-event-recipient";

describe("publish-event-repository", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should return void on success", async () => {
    // arrange
    const newCustomer: NewCustomerAccountProps = {
      firstName: "joe",
      surname: "janho",
    };

    const customer: CustomerAccount =
      CustomerAccount.createAccount(newCustomer);

    jest.spyOn(publishEvent, "publishEvent").mockReturnThis();

    await expect(
      publishDomainEvents(customer.retrieveDomainEvents())
    ).resolves.toBeUndefined();
  });
});
