import mongoose from "mongoose";

const connectDatabase = async (params) => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Database Is Connected")
    );

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ mongoDB Database Disconnected.");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 mongoDB Database reconnected.");
    });

    mongoose.connection.on("error", (error) => {
      console.log("❌ mongoDB Database connection failed.", error.message);
    });

    await mongoose.connect(`${process.env.MONGODB_URL}/studentHub`);
  } catch (error) {
    console.log("❌ mongoDB Database connection failed.", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
