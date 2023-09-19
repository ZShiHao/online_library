import express, { Request, Response, NextFunction } from "express";
import { Book } from "../models/books_model.ts";
import store from "../services/oss.ts";

const router = express.Router();

router.get("/api/books", async (req: Request, res: Response) => {
  console.log(req.query);
  let query:{title?:string|RegExp}={}
  const paginationOptions = {
    page: Number(req.query.page),
    limit: Number(req.query.pageSize),
  };
  if(req.query.title){
    query.title=new RegExp(req.query.title as string, "i")
  }

  const findRes=await Book.paginate(query,paginationOptions)
  console.log(findRes);

  res.status(200).send(findRes);
});

router.get("/api/books/:id", (req: Request, res: Response) => {
  console.log(req.params);

  res.status(200).send({});
});

router.post("/api/books", (req: Request, res: Response) => {
  res.status(200).send({});
});

export { router as createBookRouter };
