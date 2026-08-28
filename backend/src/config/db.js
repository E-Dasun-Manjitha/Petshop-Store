const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // SECURITY: We use process.env to ensure passwords NEVER leak to GitHub
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🐾 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
