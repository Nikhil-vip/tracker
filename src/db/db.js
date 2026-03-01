const mongoose = require('mongoose');
const connectDb = async () => {
  await mongoose.connect("mongodb+srv://nikhils:ZcEq7MMvBj*LEGT@first-cluster.gew5dbu.mongodb.net/tracker")
  console.log("connected to db");
}
module.exports = connectDb;