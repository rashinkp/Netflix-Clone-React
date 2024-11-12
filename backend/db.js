const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("db connected successfully"); 
  } catch (err) {
    console.log('error while connecting to db', err.message);
  }
};

module.exports = connect;
