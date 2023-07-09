const mongoose = require("mongoose");
const dbUrl =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/assignment";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
