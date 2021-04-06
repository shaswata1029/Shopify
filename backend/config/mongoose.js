const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_LOCAL_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// connect to the database

//  acquire the connection to check if it is succesful

const db = mongoose.connection;
db.once("open", function () {
  console.log("Connected succesfully to database!!");
});
// if it is connected then print the message

module.exports = db;
