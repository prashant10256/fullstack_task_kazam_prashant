import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URI!;

export const dbConnection = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");
  } catch (Error) {
    console.error("Error connected to MongoDB:", Error);
  }
};
