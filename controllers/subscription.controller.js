import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { findAndValidateSubscription } from "../utils/subscription.utils.js";

export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscription = await findAndValidateSubscription(req);

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/workflows/subscription/reminder`,
      body: { subscriptionId: subscription.id, },
      headers: { "content-type": "application/json", },
      retries: 0,
    });

    res.status(201).json({ success: true, data: { subscription, workflowRunId } });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await findAndValidateSubscription(req);

    const updatedSubscription = await Subscription.findByIdAndUpdate(subscription._id, req.body);

    res.status(200).json({ success: true, data: updatedSubscription });
  } catch (error) {
    next(error);
  }
}

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await findAndValidateSubscription(req);

    const deletedSubscription = await Subscription.findByIdAndDelete(subscription._id);

    res.status(200).json({ success: true, data: deletedSubscription });
  } catch (error) {
    next(error);
  }
}

export const getUserSubscription = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions })
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await findAndValidateSubscription(req);

    subscription.status = "cancelled";
    await subscription.save();

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

