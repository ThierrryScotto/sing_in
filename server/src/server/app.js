require('dotenv').config()
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const helmet = require('helmet')

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.connection();
  }

  middlewares() {
    this.express.use(bodyParser.json());
    this.express.use(express.json()) ;
    this.express.use(helmet());
    this.express.use(cors());
  }

  connection() {
    this.express.listen(process.env.PORT || 3000, (err, success) => {
      if (!err) console.log('you are connected');
      else console.log('error', err)
    });
  }
}

module.exports = new AppController().express;