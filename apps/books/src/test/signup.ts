import jwt from "jsonwebtoken";

export const signup = () => {
  const payload = {
    email: "test@test.com",
    id: "123456",
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");
  const cookie = `session=${base64}`;
  return cookie;
};
