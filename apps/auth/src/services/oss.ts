import OSS from "ali-oss";
import * as fs from "node:fs/promises";

try {
    const secrets = await Promise.all([
      fs.readFile("/run/secrets/OSS_ACCESS_KEY_ID", "utf-8"),
      fs.readFile("/run/secrets/OSS_ACCESS_KEY_SECRET", "utf-8"),
    ]);
    [
      process.env.OSS_ACCESS_KEY_ID,
      process.env.OSS_ACCESS_KEY_SECRET,
    ] = secrets.map((secret) => {
      return Buffer.from(secret, "base64").toString("utf-8");
    });
  } catch (error) {
    throw new Error("Read secrets error");
  }
  
  if (!process.env.OSS_ACCESS_KEY_ID) {
    throw new Error("OSS_ACCESS_KEY_ID is not found in env");
  }
  if (!process.env.OSS_ACCESS_KEY_SECRET) {
    throw new Error("OSS_ACCESS_KEY_SECRET is not found in env");
  }
const store=new OSS({
    region:'oss-cn-hangzhou',
    accessKeyId:process.env.OSS_ACCESS_KEY_ID!,
    accessKeySecret:process.env.OSS_ACCESS_KEY_SECRET!,
    bucket: 'library-image'
})


export default store