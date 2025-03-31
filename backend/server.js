require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Entry = require("./models/Entry");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Your db connection may be something like "mongodb://127.0.0.1:12345/database_name"
mongoose.connect("mongodb://Your DB Connection here/timesheet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

//GET all entries
app.get("/entries", async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
    console.log('ALL ENTRIES ROUTE HIT!!!!!!');
  } catch (error) {
    res.status(500).json({ error: "Error retrieving entries" });
  }
});

//GET a single entry by ID
app.get("/entries/:id", async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });
    res.json(entry);
    console.log('ENTRIES BY ID ROUTE HIT!!!!!!');
  } catch (error) {
    res.status(500).json({ error: "Error retrieving entry" });
  }
});

//GET a single entry by Client Name
app.get("/entries/client/:clientName", async (req, res) => {
  try {
    const clientName = req.params.clientName.charAt(0).toUpperCase() + req.params.clientName.slice(1).toLowerCase();
    console.log(clientName, " is the value we are looking for")
    const entries = await Entry.find({ Client: clientName });
    res.json(entries.length ? entries : { message: "Client Name not found" });
    console.log('ENTRIES BY CLIENTNAME ROUTE HIT!!!!!!');
  } catch (error) {
    res.status(500).json({ error: "Error retrieving By Client" });
  }
});


//POST a new entry
app.post("/entries", async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: "Error creating entry" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
