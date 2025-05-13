const mongoose = require("mongoose");

class Db {
  connection = null;

  async connect() {
    this.connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  }
}

const db = new Db();
db.connect();

module.exports = db;
