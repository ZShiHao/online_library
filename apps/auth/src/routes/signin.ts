import elxpress, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import {
  BadRequestError,
  validateRequest,
} from "@zsh-common/online-library-common";
import { Password } from "../services/password.ts";
import { User } from "../models/users.ts";

const router = elxpress.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password invalid"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    try {
      if (!existingUser) {
        throw new BadRequestError("Invalid credentials");
      }
      const passwordsMatch = await Password.compare(
        existingUser.password,
        password
      );
      if (!passwordsMatch) {
        {
          throw new BadRequestError("Invalid credentials");
        }
      }
      const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        process.env.JWT_KEY!
      );
      req.session = {
        jwt: userJwt,
      }; //转换为base64格式
      res.status(200).send(existingUser);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signinRouter };
