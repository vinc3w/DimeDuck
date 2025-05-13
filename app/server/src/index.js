require("module-alias/register");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

require("@config/db");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

require("@routes")(app, () => {});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});


