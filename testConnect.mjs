import mongoose from "mongoose";

const URL = "mongodb://admin:admin123@localhost:27017/myDatabase_test?authSource=admin&directConnection=true";
// const URL = "mongodb://admin:admin123@localhost:27017/admin?authSource=admin";
// const URL = "mongodb://admin:admin123@mongodb:27017/myDatabase_test?authSource=admin";


async function run() {
  try {
    await mongoose.connect(URL, { 
      bufferCommands: false 
    });
    console.log("✅ Connected!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
  mongoose.disconnect();
}

run();
