import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({msg: "GET all subscriptions"});
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({msg: "GET subscription details"});
});

subscriptionRouter.post("/", (req, res) => {
  res.send({msg: "CREATE subscription"});
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({msg: "UPDATE subscription"});
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({msg: "DELETE subscription"});
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({msg: "GET all user subscriptions"});
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({msg: "CANCEL subscription"});
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({msg: "GET upcoming renewals"});
});

export default subscriptionRouter;