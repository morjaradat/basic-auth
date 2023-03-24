const { app } = require("../src/server"); // destructing assignment
const supertest = require("supertest");
const mockRequest = supertest(app);

const { db } = require("../src/models/index");

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop(); // drop the database tables
});

describe("signUp router", () => {
  // test if can create a people`
  it("it should failed to create new user ", async () => {
    const response = await mockRequest.post("/signup").send({
      username: null,
      password: "123",
    });

    expect(response.status).toBe(403);
  });
  it("it should success to create new user", async () => {
    const response = await mockRequest.post("/signup").send({
      username: "mohammad",
      password: "123",
    });

    expect(response.status).toBe(201);
  });
});
describe("Authorization tests / signIn", () => {
  it("should return 401 unauthorized when username and/or password are incorrect", async () => {
    const response = await mockRequest
      .post("/signin")
      .set(
        "Authorization",
        "Basic " +
          Buffer.from("wrong-username:wrong-password").toString("base64")
      );
    expect(response.status).toBe(401);
  });

  it("should return 200 OK when username and password are correct", async () => {
    const response = await mockRequest
      .post("/signin")
      .set(
        "Authorization",
        "Basic " + Buffer.from("mohammad:123").toString("base64")
      );
    expect(response.status).toBe(200);
  });
});
