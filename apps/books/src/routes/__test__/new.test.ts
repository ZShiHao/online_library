import request from "supertest";
import app from "../../app.ts";
import { signup } from "../../test/signup.ts";

it("has a route handler listening to /api/books for post requests", async () => {
  const response = await request(app).post("/api/books").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/books").send({});

  expect(response.status).toEqual(401);
});

it("return not 401 if authorized", async () => {
  const cookie = signup();
  const response = await request(app)
    .post("/api/books")
    .set("Cookie", cookie)
    .send({});
  expect(response.status).not.toEqual(401);
});
