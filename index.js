import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.openbrewerydb.org/v1/breweries/random"
    );
    const result = response.data;
    console.log(result[0]);
    res.render("index.ejs", { random: result[0] });
  } catch (error) {
    console.log(error);
    // res.status(404).send(error.message);
  }
});
