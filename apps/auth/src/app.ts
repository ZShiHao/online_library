import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user.ts";
import { signinRouter } from "./routes/signin.ts";
import { signoutRouter } from "./routes/signout.ts";
import { signupRouter } from "./routes/signup.ts";
import { NotFoundError } from "@zsh-common/online-library-common";
import {errorHandler} from './middlewares/error_handler.ts'
import cors from 'cors'




const app = express();
app.set("trust proxy", true);
app.use(cors({
  origin:'http://localhost:5173',
  allowedHeaders:['content-type'],
  credentials:true,
  exposedHeaders:'*',
  maxAge:600
}))

app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //当是https请求时才能使用set-cookie
    sameSite:'strict'
  })
);
// app.options('*', cors())
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", (req) => {
  throw new NotFoundError();
});
app.use(errorHandler);
export default app;
