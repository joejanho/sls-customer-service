import { CustomerAccount } from "app/src/domain/customer-account";
import { CustomerAccountDto } from "app/src/dto/customer-account";
import { logger } from "@packages/logger";
import { retrieveCustomerAccount } from "app/src/repositories/retrieve-customer-account-repository";

export async function retrieveCustomerAccountUseCase(
  id: string
): Promise<CustomerAccountDto> {
  const instance: CustomerAccount = await retrieveCustomerAccount(id);

  logger.info(`retrieved customer account for ${id}`);

  return instance.toDto();
}
