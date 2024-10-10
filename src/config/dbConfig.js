const mongoose = require("mongoose");
const { NODE_ENV, ATLAS_DB_URL } = require("./server.config");

async function connectDB() {
  try {
    if (NODE_ENV === "development") {
      console.log(ATLAS_DB_URL);

      await mongoose.connect(ATLAS_DB_URL);
    }
    console.log("Connected to database");
  } catch (error) {
    console.log("Unable to connect to database");
    console.log(error);
  }
}

module.exports = { connectDB };
