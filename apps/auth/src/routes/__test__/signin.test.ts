import request from "supertest";
import app from "../../app.ts";

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "passwordzsh",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "passwordzsh",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "passwordz2h",
    })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "passwordzsh",
    })
    .expect(201);
  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "passwordzsh",
    })
    .expect(200);
  expect(res.get("Set-Cookie")).toBeDefined();
});
