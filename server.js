import express from 'express';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/subscriptions", subscriptionRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!')
});

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
})

export default app;