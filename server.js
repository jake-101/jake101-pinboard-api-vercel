const jsonServer = require('json-server')
const server = jsonServer.create()
var db = {}
const middlewares = jsonServer.defaults()
var request = require('request')
var opts = { url: `https://${process.env.VERCEL_URL}/db`, json: true }
request(opts, function (error, response, body) {
  if (error) throw error
db = body
const router = jsonServer.router(db)
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
})

