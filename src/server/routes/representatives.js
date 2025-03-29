const { Router } = require('express');
const axios = require('axios');
const representativesRouter = Router();

representativesRouter.get('/search', async (req, res) => {
  const { address } = req.query;
  console.log('reached')
  console.log(address, 'REQ WAS RECEIVED');
  console.log(req.query);
  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key is missing!" });
  }

  if (!address) {
    return res.status(400).json({ error: "Address is required!" });
  }

  try {
    const encodedAddress = encodeURIComponent(address); // Encode the user input
    const response = await axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${encodedAddress}`);
    console.log(response.data, 'the response')
    res.send(response.data).status(200)
  } catch (error) {
    console.error("Error fetching representatives:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = representativesRouter;