const express = require("express");
const router = express.Router({mergeParams: true});
const Camp = require("../models/camp");
const {isLoggedIn} = require("../utils/middleware");
const axios = require("axios");

router.get("/news", isLoggedIn, async (req, res) => {
  const API_KEY = "e69d415538ea4339a7044926362dd4a2";

  const url = `https://newsapi.org/v2/everything?q=virus&in&india&pageSize=5&apiKey=${API_KEY}`;

  let response = await axios.get(url);
  //console.log(response.data.articles[0].title);
  res.json(response.data.articles);
});

router.get("/camps", isLoggedIn, async (req, res) => {
  let camps = await Camp.find().populate("AssignDoctor");
  // console.log(camps);
  res.json(camps);
});

module.exports = router;