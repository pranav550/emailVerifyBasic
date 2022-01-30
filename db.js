const mongoose = require("mongoose");

module.exports = async function connection() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("connect to database");
  } catch (err) {
    console.log("could not connect database");
  }
};
