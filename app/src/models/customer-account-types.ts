export type CreateCustomerAccountProps = {
  id?: string;
  created?: string;
  updated?: string;
  firstName: string;
  surname: string;
};

export type CustomerAccountProps = {
  id: string;
  created: string;
  updated: string;
  firstName: string;
  surname: string;
};

export type NewCustomerAccountProps = {
  firstName: string;
  surname: string;
};
