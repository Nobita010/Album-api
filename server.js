const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const albumRoutes = require("./routes/album");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/album", albumRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
