const { Router } = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const { GNEWS_API } = process.env;

const articlesRouter = Router();

articlesRouter.get("/", async (req, res) => {
  // Make request to GNews API
  try {
    const today = new Date().toISOString().split("T")[0]; // "2025-03-28"
    const response = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q: "politics",
        lang: "en",
        country: "us",
        from: today,
        to: today,
        max: 10,
        apikey: GNEWS_API,
      },
    });
    res.status(200).send(response.data);
  } catch (err) {
    console.error("Error in request to GNews in router: ", err);
    res.sendStatus(500);
  }
});

module.exports = articlesRouter;
