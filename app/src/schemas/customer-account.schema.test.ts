import { CustomerAccountDto } from "app/src/dto/customer-account";
import { schema } from "./customer-account.schema";
import { schemaValidator } from "../../../packages/schema-validator";

let body: CustomerAccountDto = {
  id: "f39e49ad-8f88-448f-8a15-41d560ad6d70",
  firstName: "joe",
  surname: "janho",
  created: "2022-01-01T00:00:00.000Z",
  updated: "2022-01-01T00:00:00.000Z",
};

describe("customer-account-schema", () => {
  it("should validate correctly with the correct payload", () => {
    expect(() => schemaValidator(schema, body)).not.toThrow();
  });

  it("should throw an error if id is not valid", () => {
    const badBody = {
      ...body,
      id: 111, // not a string
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/id\\",\\"schemaPath\\":\\"#/properties/id/type\\",\\"keyword\\":\\"type\\",\\"params\\":{\\"type\\":\\"string\\"},\\"message\\":\\"must be string\\"}]"`
    );
  });

  it("should throw an error if firstName is not valid", () => {
    const badBody = {
      ...body,
      firstName: "!@$%*", // not valid
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/firstName\\",\\"schemaPath\\":\\"#/properties/firstName/pattern\\",\\"keyword\\":\\"pattern\\",\\"params\\":{\\"pattern\\":\\"^[a-zA-Z]+$\\"},\\"message\\":\\"must match pattern \\\\\\"^[a-zA-Z]+$\\\\\\"\\"}]"`
    );
  });

  it("should throw an error if surname is not valid", () => {
    const badBody = {
      ...body,
      surname: "!@$%*", // not valid
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/surname\\",\\"schemaPath\\":\\"#/properties/surname/pattern\\",\\"keyword\\":\\"pattern\\",\\"params\\":{\\"pattern\\":\\"^[a-zA-Z]+$\\"},\\"message\\":\\"must match pattern \\\\\\"^[a-zA-Z]+$\\\\\\"\\"}]"`
    );
  });

  it("should throw an error if updated is not valid", () => {
    const badBody = {
      ...body,
      updated: 111, // not a string
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/updated\\",\\"schemaPath\\":\\"#/properties/updated/type\\",\\"keyword\\":\\"type\\",\\"params\\":{\\"type\\":\\"string\\"},\\"message\\":\\"must be string\\"}]"`
    );
  });
});
