import {
  CustomerAccountDto,
  NewCustomerAccountDto,
} from "app/src/dto/customer-account";

import { CustomerAccount } from "app/src/domain/customer-account";
import { createCustomerAccount } from "app/src/repositories/create-customer-account-repository";
import { logger } from "@packages/logger";
import { publishDomainEvents } from "app/src/repositories/publish-event-recipient";

export async function createCustomerAccountUseCase(
  account: NewCustomerAccountDto
): Promise<CustomerAccountDto> {
  const newCustomer: CustomerAccount = CustomerAccount.createAccount(account);

  await createCustomerAccount(newCustomer);
  logger.info(`customer account created for ${newCustomer.id}`);

  await publishDomainEvents(newCustomer.retrieveDomainEvents());

  return newCustomer.toDto();
}
