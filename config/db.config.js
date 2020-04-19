const mongoose = require('mongoose');
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI || /*'mongodb://localhost:27017/astro-little-taurus'*/ 
'mongodb://heroku_64dmrqgs:k00cc72igoc2bugcv5k2lmf5jm@ds161021.mlab.com:61021/heroku_64dmrqgs'
;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
    .catch(error => console.error(`An error ocurred trying to connect to de database ${MONGODB_URI}`, error));

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
