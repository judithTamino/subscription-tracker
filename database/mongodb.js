/* eslint-disable no-undef */
import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI)
  throw new Error("Please define the MONGODB environment variable inside .env<development/production>.local");

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to database in ${NODE_ENV} mode`)
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
    process.exit(1);
  }
}

export default connectToDB;
