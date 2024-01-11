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

// Render initial homepage
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Render a random brewery when button clicked using api/axios
app.post("/submit", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.openbrewerydb.org/v1/breweries/random"
    );
    const result = response.data; // Check response is correct by logging
    // console.log(result[0]);
    res.render("index.ejs", { random: result[0] });
  } catch (error) {
    // Let client know error and log for developer
    console.log(error);
    res.status(404).send(error.message);
  }
});

// Post request for search form results
app.post("/search", async (req, res) => {
  try {
    // Get the value of the request from body
    const search = req.body["keyword"];
    const response = await axios.get(
      `https://api.openbrewerydb.org/v1/breweries/search?query=${search}`
    ); // Add it to template string of axios api request
    console.log(response.data);
    res.render("index.ejs", { search: response.data }); // Send to ejs for display list of results
  } catch {
    console.log(error);
    res.status(404).send(error.message);
  }
});
