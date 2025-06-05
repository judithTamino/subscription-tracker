import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription Name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "Subscription Price is required"],
    minLength: [0, "Price must be greater than 0"],
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "GBP"],
    default: "USD",
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
  },
  category: {
    type: String,
    enum: ["news", "sports", "entertainment", "lifestyle", "tech", "finance", "politics", "other"],
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value < new Date(),
      message: "Start date must be in the past",
    }
  },
  renwalDate: {
    type: Date,
    validate: {
      validator: function (value) { value > this.startDate },
      message: "Start date must be in the past",
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  }
}, { timestamps: true });

// Auto-calculate renwal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renwalDate) {
    const renwalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renwalDate = new Date(this.startDate);
    this.renwalDate.setDate(this.renwalDate.getDate() + renwalPeriods[this.frequency])
  }

  // Auto-update the status if renewal date has passed
  if (this.renwalDate < new Date())
    this.status = "expired";

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;