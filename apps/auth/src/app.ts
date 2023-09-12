import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user.ts";
import { signinRouter } from "./routes/signin.ts";
import { signoutRouter } from "./routes/signout.ts";
import { signupRouter } from "./routes/signup.ts";
import { NotFoundError, errorHandler } from "@zsh-common/online-library-common";




const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //当是https请求时才能使用set-cookie
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", (req) => {
  throw new NotFoundError();
});
app.use(errorHandler);
export default app;
