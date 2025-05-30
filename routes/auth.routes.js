import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send({msg: "Sign up"});
});

authRouter.post("/sign-in", (req, res) => {
  res.send({msg: "Sign in"});
});

authRouter.post("/sign-out", (req, res) => {
  res.send({msg: "Sign out"});
});

export default authRouter;