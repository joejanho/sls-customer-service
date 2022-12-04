export type CreateCustomerAccountDto = {
  id?: string;
  created?: string;
  updated?: string;
  firstName: string;
  surname: string;
};

export type CustomerAccountDto = {
  id: string;
  created: string;
  updated: string;
  firstName: string;
  surname: string;
};

export type NewCustomerAccountDto = {
  firstName: string;
  surname: string;
};
