const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/DBName",)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Not Connected");
  });


//Model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

//HomePAGE
app.get("/", (req, res) => {
  res.send("Hello world");
});

// POST API for ADDING USER
app.post("/post", async (req, res) => {
  console.log(req.body);
  const details = req.body;
  const data = new User(details);
  try {
    const response = await data.save();
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET API 
app.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(8000, () => {
  console.log("Server is Started");
});
