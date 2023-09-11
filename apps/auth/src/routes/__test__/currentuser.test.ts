import request from "supertest";
import app from "../../app.ts";
import { signup } from "../../test/signup.ts";

it("responds with details about the current user", async () => {
  const cookie = await signup();
  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);

  expect(res.body.currentUser).toEqual(undefined);
});
