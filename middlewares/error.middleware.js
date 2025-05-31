const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const msg = "Resource not found";
      error = new Error(msg);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const msg = "Duplicate field value entered";
      error = new Error(msg);
      error.statusCode = 400;
    }

    // Mongoose validation key
    if (err.name === "validationError") {
      const msg = Object.values(err.errors).map(val => val.message);
      error = new Error(msg.join(', '));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({ success: false, error: error.message || "Server Error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;