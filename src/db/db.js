import mongoose from "mongoose";


let isConnected = false; // Prevent multiple connections on Vercel

export const connectDB = async () => {
  if (isConnected) {
    console.log("🟢 Using existing MongoDB connection");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000
    });

    isConnected = connectionInstance.connections[0].readyState;
    console.log(`✅ MongoDB connected! DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection FAILED:", error);
    throw error;
  }
};
