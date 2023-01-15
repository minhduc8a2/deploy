const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

//set up mongoose
const connectString =
  "mongodb+srv://minhduc8a2:heroandroid@cluster0.owiio.mongodb.net/Task?retryWrites=true&w=majority";

mongoose.connect(connectString, () => {
  console.log("Connected to Mongoose");
});
//schema
const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [500, "max length is 500 letters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
//model
const Task = mongoose.model("Task", taskSchema);

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
// app.use(cors());

app.get("/api/tasks", getAllTasks);
app.get("/", (req, res) => {
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log("server listening on port: " + PORT);
});
