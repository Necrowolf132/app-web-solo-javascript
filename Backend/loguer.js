
const loguer = require('morgan')
const winston = require('winston')

loguer.token('res-header', function getResHeader (res) {
  return JSON.stringify(res.rawHeaders) + ' ' + JSON.stringify(res.headers)
})
loguer.token('res-params', function getResParams (res) {
  return JSON.stringify(res.params) + ' ' + JSON.stringify(res.query)
})
loguer.token('res-body', function getResBody (res) {
  return JSON.stringify(res.body)
})

const Duplador = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './Backend/access.log',
      handleExceptions: true,
      json: false,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
})
module.exports = loguer
module.exports.stream = {
  write: function (message, encoding) {
    message = message.replace(/"/gi, ' ')
    Duplador.info(message)
  }
}
