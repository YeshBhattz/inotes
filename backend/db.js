const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/inotebook";

const con = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = con;
