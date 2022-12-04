import { CustomerAccount } from "app/src/domain/customer-account/customer-account";
import { CustomerAccountDto } from "app/src/dto/customer-account";
import { retrieveAccount } from "app/src/adapters/database";

export async function retrieveCustomerAccount(
  id: string
): Promise<CustomerAccount> {
  const customerAccount: CustomerAccountDto = await retrieveAccount(id);
  return CustomerAccount.toDomain(customerAccount);
}
