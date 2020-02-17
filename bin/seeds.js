const mongoose = require('mongoose');
require('../config/db.config');
const Event = require('../models/event.model');


const events = [
    {
      "name": "Close approach of the Moon and Mars",
      "date": "18-02-2020",
      "description": "The Moon and Mars will make a close approach, passing within 0°45' of each other. The Moon will be 25 days old.",
      "image": "https://in-the-sky.org/image.php?style=icon&img=imagedump/conjunctions/conjunctions.jpg",
      "category" : "Planets",
      "visibility" : "Visible"
    },
    {
        "name": "Close approach of the Moon and Jupiter",
        "date": "19-02-2020",
        "description": "The Moon and Jupiter will make a close approach, passing within 0°55' of each other. The Moon will be 26 days old.",
        "image": "https://in-the-sky.org/image.php?style=icon&img=imagedump/conjunctions/conjunctions.jpg",
        "category" : "Planets",
        "visibility" : "Visible with telescope"
      },
      {
        "name": "Close approach of the Moon and Saturn",
        "date": "20-02-2020",
        "description": "The Moon and Saturn will make a close approach, passing within 1°44' of each other. The Moon will be 27 days old.",
        "image": "https://in-the-sky.org/image.php?style=icon&img=imagedump/conjunctions/conjunctions.jpg",
        "category" : "Planets",
        "visibility" : "Not visible"
      }
  ];

  Event.create(events)
  .then(() => {
    console.info("Seeds success:", events);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Seeds error:", error);
    mongoose.connection.close();
  });