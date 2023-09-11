import elxpress, { Request, Response, NextFunction } from "express";

const router = elxpress.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;
  res.status(200).send({});
});

export { router as signoutRouter };
