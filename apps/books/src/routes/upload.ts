import express, { Request, Response, NextFunction } from "express";
import { currentUser, requireAuth } from "@zsh-common/online-library-common";

const router = express.Router();

router.get("/api/books/upload", requireAuth, (req: Request, res: Response) => {
  console.log('uploading file')
  res.status(200).send({});
});

export { router as createUploadRouter };
