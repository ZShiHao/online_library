import express, { Request, Response } from "express";
import { Tag } from "../models/tag_model.ts";

const router = express.Router();

router.get("/api/tags",async (req: Request, res: Response) => {
  try {
    const findRes=await Tag.find({})
    res.status(200).send({
      status:200,
      data:findRes,
      message:'success'
    });
  } catch (error) {
    res.status(200).send({
      status:400,
      message:'fail'
    });
  }

});

export { router as createTagsRouter };
