const jsonServer = require('json-server')
const server = jsonServer.create()
var db = {}
const middlewares = jsonServer.defaults()
const axios = require("axios");
axios.get(`https://${process.env.VERCEL_URL}/db`).then((response) => {
db = response
const router = jsonServer.router(db)
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running', "API Key: ", process.env.PINBOARD_TOKEN, "URL: ", process.env.VERCEL_URL)
})
}, (error) => {
  console.log(error);
});



