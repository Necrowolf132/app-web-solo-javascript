
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

function pad2 (num) {
  var str = String(num)

  return (str.length === 1 ? '0' : '') + str
}
function FormatDate() {
  var CLF_MONTH = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  dateTime = new Date()
  var date = dateTime.getUTCDate()
  var hour = dateTime.getUTCHours()
  var mins = dateTime.getUTCMinutes()
  var secs = dateTime.getUTCSeconds()
  var year = dateTime.getUTCFullYear()

  var month = CLF_MONTH[dateTime.getUTCMonth()]

  return pad2(date) + '/' + month + '/' + year +
    ':' + pad2(hour) + ':' + pad2(mins) + ':' + pad2(secs) +
    ' +0000'
}
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
module.exports.MyLog = {
  logError: function (Error) {
    const mensaje = '<----- Respo-ERROR ----->: ' + '[' + FormatDate() + ']' + ' = ' + Error
    Duplador.info(mensaje)
  }
}
module.exports.stream = {
  write: function (message, encoding) {
    message = message.replace(/"/gi, ' ')
    Duplador.info(message)
  }
}
