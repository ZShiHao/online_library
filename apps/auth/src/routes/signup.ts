import elxpress, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users.ts";
import { body } from "express-validator";
import {
  BadRequestError,
  validateRequest,
} from "@zsh-common/online-library-common";

const router = elxpress.Router();

function setDefaultUsername(req:Request,res:Response,next:NextFunction){
  if(!req.body.username){
    req.body.username = req.body.email.split("@")[0];
  }
  req.body.avatar='avatar/default-avatar.jpg'
  next();
}

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  setDefaultUsername,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password,username,avatar } = req.body;
    const existingUser = await User.findOne({ email });
    try {
      //expressbug无法捕获错误,所以手动try catch捕获错误
      if (existingUser) {
        throw new BadRequestError("Email in use");
      }
    } catch (error) {
      return next(error);
    }
    const user = User.build({ email, password,username,avatar });
    await user.save();
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userJwt,
    }; //转换为base64格式
    res.status(201).send(user);
  }
);

export { router as signupRouter };
