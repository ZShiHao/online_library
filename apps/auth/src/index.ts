import app from "./app.ts";
import mongoose from "mongoose";
import * as fs from "node:fs/promises";


try {
  const secrets = await Promise.all([
    fs.readFile("/run/secrets/MONGO_URI", "utf-8"),
    fs.readFile("/run/secrets/JWT_KEY", "utf-8"),

  ]);
  [
    process.env.MONGO_URI,
    process.env.JWT_KEY,
  ] = secrets.map((secret) => {
    return Buffer.from(secret, "base64").toString("utf-8");
  });
} catch (error) {
  throw new Error("Read secrets error");
}


if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}

//需要ESM规范
await mongoose.connect(process.env.MONGO_URI!, {
  dbName: "library",
});
console.log("Connected to mongodb");

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

