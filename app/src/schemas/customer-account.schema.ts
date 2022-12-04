export const schema = {
  type: "object",
  required: ["id", "firstName", "surname", "created", "updated"],
  maxProperties: 5,
  minProperties: 5,
  properties: {
    id: {
      type: "string",
    },
    firstName: {
      type: "string",
      pattern: "^[a-zA-Z]+$",
    },
    surname: {
      type: "string",
      pattern: "^[a-zA-Z]+$",
    },
    created: {
      type: "string",
    },
    updated: {
      type: "string",
    },
  },
};
