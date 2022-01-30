const express = require("express");
const app = express();
require("dotenv").config();
const users = require("./routes/user");

app.use(express.json());
const connection = require("./db");
(async () => await connection())();

app.use("/api/users", users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listing on PORT ${PORT}`);
});
