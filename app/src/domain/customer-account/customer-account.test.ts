import { NewCustomerAccountProps } from "app/src/models/customer-account-types";

import { CustomerAccount } from "app/src/domain/customer-account";
import { CustomerAccountDto } from "app/src/dto/customer-account";

let customer: CustomerAccountDto = {
  created: "2022-01-01T00:00:00.000Z",
  firstName: "joe",
  id: "f39e49ad-8f88-448f-8a15-41d560ad6d70",
  surname: "janho",
  updated: "2022-01-01T00:00:00.000Z",
};

describe("customer-account", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2022-01-01"));
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe("create account", () => {
    it("should fail creating a new account with an invalid customer", () => {
      // arrange
      const newCustomerAccount: NewCustomerAccountProps = {
        firstName: "±", // invalid
        surname: "any",
      };

      // act / assert
      expect(() =>
        CustomerAccount.createAccount(newCustomerAccount)
      ).toThrowErrorMatchingInlineSnapshot(
        `"[{\\"instancePath\\":\\"/firstName\\",\\"schemaPath\\":\\"#/properties/firstName/pattern\\",\\"keyword\\":\\"pattern\\",\\"params\\":{\\"pattern\\":\\"^[a-zA-Z]+$\\"},\\"message\\":\\"must match pattern \\\\\\"^[a-zA-Z]+$\\\\\\"\\"}]"`
      );
    });

    it("should create the new account successfully with a valid customer", () => {
      // arrange
      const newCustomerAccount: NewCustomerAccountProps = {
        firstName: "joe",
        surname: "janho",
      };

      // act
      const newCustomer = CustomerAccount.createAccount(newCustomerAccount);

      // assert
      expect(newCustomer).toMatchSnapshot();
    });
  });

  describe("toDto", () => {
    it("should create the correct dto", () => {
      // arrange
      const newCustomerAccount: NewCustomerAccountProps = {
        firstName: "joe",
        surname: "janho",
      };

      // act
      const newCustomer = CustomerAccount.createAccount(newCustomerAccount);

      // assert
      expect(newCustomer.toDto()).toMatchSnapshot();
    });
  });

  describe("toDomain", () => {
    it("should create a domain object based on a dto", () => {
      // arrange
      const customerAccountProps: CustomerAccountDto = {
        id: "f39e49ad-8f88-448f-8a15-41d560ad6d70",
        firstName: "joe",
        surname: "janho",
        created: "2022-01-01T00:00:00.000Z",
        updated: "2022-01-01T00:00:00.000Z",
      };

      // act
      const customerAccount: CustomerAccount =
        CustomerAccount.toDomain(customerAccountProps);

      // assert
      expect(customerAccount).toMatchSnapshot();
    });
  });

  describe("add domain event", () => {
    it("should return the domain events on the object", () => {
      // arrange
      const newCustomerAccount: NewCustomerAccountProps = {
        firstName: "joe",
        surname: "janho",
      };

      // act
      const newCustomer = CustomerAccount.createAccount(newCustomerAccount);

      // assert
      expect(newCustomer.retrieveDomainEvents()).toMatchSnapshot();
    });

    it("should clear all domain events once retrieved", () => {
      // arrange
      const newCustomerAccount: NewCustomerAccountProps = {
        firstName: "joe",
        surname: "janho",
      };

      // act
      const newCustomer = CustomerAccount.createAccount(newCustomerAccount);
      newCustomer.retrieveDomainEvents(); // call this once to flush the events

      // assert
      expect(newCustomer.retrieveDomainEvents()).toEqual([]);
    });
  });
});
