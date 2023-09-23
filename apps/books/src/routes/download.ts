import express, { Request, Response, NextFunction } from "express";
import { NoSourceError } from "../errors/no_source_error.ts";
import { Book } from "../models/books_model.ts";
import store from "../services/oss.ts";

const router = express.Router();

router.get(
  "/api/books/download/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findRes = await Book.findOne({ _id: req.params.id });
      if (!findRes) throw new NoSourceError("No such book.");
      if (findRes.source.length == 0)
        throw new NoSourceError("No download source.");
      const downloadUrl=store.signatureUrl("books/" + findRes.source[0].fileName, {
        expires: 5,
      });
      res.status(200).send({
        status:200,
        data:{
            id:req.params.id,
            size:findRes.source[0].size,
            url:downloadUrl
        },
        message:'Access download.'
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router as createDownloadRouter };
