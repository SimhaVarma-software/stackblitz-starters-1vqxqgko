const express = require('express');
const { resolve } = require('path');
const MenuItem = require("./MenuItems");
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get("/menu", async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).send("Failed to fetch menu items");
  }
});

app.post("/menu", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).send("Please fill all fields");
    }
    const newMenuItem = new MenuItem({
      name,
      description,
      price,
    });
    await newMenuItem.save();
    res.status(201).send("The new item is added successfully");
  } catch (error) {
    res.status(500).send("The item is not added successfully");
  }
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("The database is connected successfully"))
  .catch((error) => console.log("The database is not connected", error));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});