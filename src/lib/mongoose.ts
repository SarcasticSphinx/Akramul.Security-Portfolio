import mongoose from "mongoose";

export const connectToDB = async (): Promise<void> => {
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    console.log("mongodb uri not provided");
    return;
  }
  await mongoose.connect(URI).then(() => console.log("connected to MongoDB"));
};
