require('babel-register');
const Koa = require("koa")
const app = new Koa()
const PORT = 3000

const main = ctx => {
    ctx.response.body = "This dasnoanf s ndosfn sonf "
}

app.use(main)

app.listen(PORT,function () {
    console.log(`Port listen ${PORT}` )
})