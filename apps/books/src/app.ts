import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import cors from 'cors'

import {
  NotFoundError,
  errorHandler,
  currentUser,
  requireAuth,
} from "@zsh-common/online-library-common";
import { createBookRouter } from "./routes/books.ts";
import { createUploadRouter } from "./routes/upload.ts";


const app = express();
app.set("trust proxy", true);
app.use(cors());

app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //当是https请求时才能使用set-cookie
  })
);
app.use(currentUser);
app.use(createUploadRouter);

app.use(createBookRouter);



app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export default app;
