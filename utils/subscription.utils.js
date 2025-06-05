import Subscription from "../models/subscription.model.js";

export const findAndValidateSubscription = async (req) => {
  const subscription = await Subscription.findById(req.params.id);

  if (!subscription) {
    const error = new Error("Subscription not found");
    error.statusCode = 404;
    throw error;
  }

  // check if the user is the owner of the subscription
  if (req.user.id != subscription.user) {
    const error = new Error("You are not the owner of this subscription card");
    error.statusCode= 401;
    throw error;
  }

  return subscription;
};