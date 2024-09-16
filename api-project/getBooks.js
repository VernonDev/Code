const express = require('express')
const router = express.Router()



app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })

  