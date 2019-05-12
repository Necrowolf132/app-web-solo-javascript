
const loguer = require('morgan')

loguer.token('res-header', function getResHeader (res) {
  return JSON.stringify(res.rawHeaders) + '\n---------------\n' + JSON.stringify(res.headers)
})
loguer.token('res-params', function getResParams (res) {
  return JSON.stringify(res.params) + '\n---------------\n' + JSON.stringify(res.query)
})
loguer.token('res-body', function getResBody (res) {
  return JSON.stringify(res.body)
})

module.exports = loguer
