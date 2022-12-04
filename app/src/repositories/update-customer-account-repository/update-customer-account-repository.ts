import { CustomerAccount } from "app/src/domain/customer-account/customer-account";
import { CustomerAccountDto } from "app/src/dto/customer-account";
import { updateAccount } from "app/src/adapters/database";

export async function updateCustomerAccount(
  account: CustomerAccount
): Promise<CustomerAccount> {
  const customerAccount: CustomerAccountDto = await updateAccount(
    account.toDto()
  );
  return CustomerAccount.toDomain(customerAccount);
}
