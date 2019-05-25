const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  poolSize: 10
}).then( connect => {
  console.log('Base de datos conectada OK')
}).catch(connect => {
  console.log('Base de datos conectada ERROR', connect)
})
