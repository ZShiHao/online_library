import elxpress from "express";
import { requireAuth, currentUser } from "@zsh-common/online-library-common";
const router = elxpress.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
