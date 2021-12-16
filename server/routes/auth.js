import express from "express";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares";
// controllers
import {
  register,
  login,
  currentUser,
  logout,
  forgotPassword,
  resetPassword,
  registerActivate,
  googleLogin,
  activateEmail,
} from "../controllers/auth";

router.post("/register", register);
// router.post("/register-activate", registerActivate);
router.post("/login", login);

router.get("/current-user", requireSignin, currentUser);
router.get("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", requireSignin, resetPassword);

// social
router.post("/google_login", googleLogin);

router.post("/activate", activateEmail);

module.exports = router;
