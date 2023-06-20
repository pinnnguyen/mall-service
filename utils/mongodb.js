const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(`${config.mongodbUrl}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('open', function (err) {
  if (err) {
    console.log('start mongodb error')
    throw err
  }
  console.log('start mongodb success')
})

module.exports = {
  db
}
