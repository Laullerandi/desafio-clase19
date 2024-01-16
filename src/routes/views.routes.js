import { Router } from "express";
import authMdw from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  res.redirect("/login");
});

router.get("/login", async (req, res) => {
  res.render("login", { style: "styles.css" });
});

router.get("/register", async (req, res) => {
  res.render("register", { style: "styles.css" });
});

router.get("/profile", authMdw, async (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.status(200).render("profile", {
    style: "styles.css",
    user,
  });
});

export default router;
