import request from "supertest";
import app from "../app.ts";

export const signup = async () => {
  const email = "test@test.com";
  const password = "passwordzsh";
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);
  const cookie = res.get("Set-Cookie");
  console.log(cookie, "cookie");
  return cookie;
};
