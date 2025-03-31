require("dotenv").config();
const mongoose = require("mongoose");
const Entry = require("./models/Entry");
const fs = require("fs");

mongoose.connect("//Your DB Connection here/timesheet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB for data import");

  const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

  try {
    await Entry.insertMany(data);
    console.log("Data successfully imported!");
    mongoose.connection.close(); 
  } catch (error) {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  }
});