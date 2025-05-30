import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({msg: "GET all users"});
});

userRouter.get("/:id", (req, res) => {
  res.send({msg: "GET user details"});
});

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