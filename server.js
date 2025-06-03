import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arctjet.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!')
});

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
  connectToDB();
});

export default app;