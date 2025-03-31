const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  Date: String,
  Client: String,
  Project: String,
  "Project Code": String,
  Hours: Number,
  "Billable": String,
  "First Name": String,
  "Last Name": String,
  "Billable Rate": Number,
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
