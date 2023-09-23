import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'

import {
  NotFoundError,
  errorHandler,
} from "@zsh-common/online-library-common";
import { createTagsRouter } from "./routes/tags.ts";


const app = express();
app.set("trust proxy", true);
app.use(cors());

app.use(bodyParser.json());

app.use(createTagsRouter);


app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export default app;
