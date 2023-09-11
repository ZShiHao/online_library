import app from "./app.ts";

import mongoose from "mongoose";

if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}
//需要ESM规范
await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to mongodb");

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
