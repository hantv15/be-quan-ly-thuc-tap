import express from "express";
import { createManager, getListManager, getManager, removeManager, updateManager } from "../controllers/manager";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";
import { role } from "../utils/role";

const router = express.Router();

  
  router.get("/manager", getListManager);
router.get("/manager/:id", isAuthenticateUser, getManager);
router.post(
  "/manager",
  isAuthenticateUser,
  authorizeRoles([role.dev]),
  createManager
);
router.patch(
  "/manager/:id",
  isAuthenticateUser,
  authorizeRoles([role.dev]),
  updateManager
);
router.delete(
  "/manager/:id",
  isAuthenticateUser,
  authorizeRoles([role.dev]),
  removeManager
);

module.exports = router;
