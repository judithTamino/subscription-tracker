import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send({msg: "Create new user"});
});

userRouter.post("/:id", (req, res) => {
  res.send({msg: "UPDATE user"});
});

userRouter.delete("/:id", (req, res) => {
  res.send({msg: "DELETE user"});
});

export default userRouter;