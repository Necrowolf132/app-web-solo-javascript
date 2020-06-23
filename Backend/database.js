const mongoose = require('mongoose')

function conectarSetTime(){

  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    poolSize: 10
  }).then( (connect) => {
    console.log('Base de datos conectada OK')
  }).catch((connect) => {
    console.log('Base de datos conectada ERROR', connect)
   setTimeout(conectarSetTime,10000);
  }) 
}  
conectarSetTime();
