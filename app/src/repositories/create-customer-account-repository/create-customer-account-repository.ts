import { CustomerAccount } from "app/src/domain/customer-account";
import { CustomerAccountDto } from "app/src/dto/customer-account";
import { createAccount } from "app/src/adapters/database";

export async function createCustomerAccount(
  account: CustomerAccount
): Promise<CustomerAccount> {
  const customerAccount: CustomerAccountDto = await createAccount(
    account.toDto()
  );
  return CustomerAccount.toDomain(customerAccount);
}
