require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);
mongoose.connect(process.env.MONGO_URI);

const port = process.env.port || 8000;
app.listen(port, (err, data) => {
  if (err) console.log("ERROR", err);
  else console.log(`Server running on port:${port}`);
});
