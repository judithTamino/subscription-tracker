import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { cancelSubscription, createSubscription, deleteSubscription, getSubscriptionDetails, getSubscriptions, getUserSubscription, updateSubscription} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscriptionDetails);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionRouter.patch("/:id/cancel", authorize, cancelSubscription);

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({msg: "GET upcoming renewals"});
});

export default subscriptionRouter;