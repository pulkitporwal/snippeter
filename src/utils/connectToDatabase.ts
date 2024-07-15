import mongoose from "mongoose";

export default async function () {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI!}`);

    const connectionInstance = mongoose.connection;

    connectionInstance.on("connected", () => {
      console.log("MongoDB Connected");
    });
    connectionInstance.on("error", (err) => {
      console.log("ERR: While Connecting to MongoDB", err);
      process.exit();
    });
  } catch (error) {
    console.log("ERR: Something went wrong while connecting to Database");
    console.log(error);
  }
}
