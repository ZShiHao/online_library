import express, { Request, Response, NextFunction } from "express";
import { Book } from "../models/books_model.ts";
import { Query, PaginateOptions } from "mongoose";
import store from "../services/oss.ts";

const router = express.Router();

router.get("/api/books", async (req: Request, res: Response) => {
  let query: { [key: string]: string | RegExp } = {};

  if (req.query.title) {
    query.title = new RegExp(req.query.title as string, "i");
  }

  if (req.query.tags) query.tags = req.query.tags as string;

  const paginationOptions: PaginateOptions = {
    page: Number(req.query.current),
    limit: Number(req.query.pageSize),
  };

  if (req.query.sort) {
    let sort: { [key: string]: string | number } = {};
    sort[req.query.sort as string] = -1;
    paginationOptions.sort = sort;
  }

  const findRes = await Book.paginate(query, paginationOptions);

  console.log(findRes);

  const body = {
    docs: findRes.docs,
    total: findRes.totalDocs,
    totalPages: findRes.totalPages,
    page: findRes.page,
    pageSize: findRes.limit,
  };

  res.status(200).send(body);
});

router.get("/api/books/:id", (req: Request, res: Response) => {
  console.log(req.params);

  res.status(200).send({});
});

router.post("/api/books", async (req: Request, res: Response) => {
  try {
    const updateResult = await Book.updateOne({ _id: req.query.id }, req.body);
    if (updateResult.acknowledged) {
      res.status(200).send({
        status: 200,
        message: "Update success.",
      });
    } else {
      res.status(200).send({
        status: 400,
        message: "Update failed.",
      });
    }
  } catch (error: any) {
    res.status(200).send({
      status: 400,
      message: error.message,
    });
  }
});

export { router as createBookRouter };
