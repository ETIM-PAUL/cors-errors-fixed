const express = require("express");
const request = require("request");
require("dotenv").config();

const app = express();
const API_URL = "https://api.musixmatch.com/ws/1.1/"; // Replace this URL with your own
const API_KEY = process.env.MUSIXMATCH_API_KEY;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/track", (req, res) => {
  request(
    {
      url: `${API_URL}track.search?q_artist=${req.query.artist}&q_track=${req.query.track}&s_track_rating=desc&apikey=${API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});
app.get("/lyrics", (req, res) => {
  request(
    {
      url: `${API_URL}track.lyrics.get?track_id=${req.query.track_id}&apikey=${API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
