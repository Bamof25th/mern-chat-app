import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
const url = process.env.DB_URL;

export const connectusingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDb Connected Using Mongoose.");
  } catch (err) {
    console.log("Error connecting to the database.");
    console.log(err);
  }
};
