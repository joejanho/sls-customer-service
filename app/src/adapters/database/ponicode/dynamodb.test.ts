import * as dynamodb from "@adapters/database/dynamodb";
// @ponicode
describe("dynamodb.retrieveAccount", () => {
  test("0", async () => {
    await dynamodb.retrieveAccount("a85a8e6b-348b-4011-a1ec-1e78e9620782");
  });

  test("1", async () => {
    await dynamodb.retrieveAccount("03ea49f8-1d96-4cd0-b279-0684e3eec3a9");
  });

  test("2", async () => {
    await dynamodb.retrieveAccount("7289708e-b17a-477c-8a77-9ab575c4b4d8");
  });

  test("3", async () => {
    await dynamodb.retrieveAccount("");
  });
});
