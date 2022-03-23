const express = require("express");
const app = express();
const cors = require("cors");
const { postRoutes } = require("./routes");
app.use(cors());
app.use(express.json());
const PORT = 2000;

app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
