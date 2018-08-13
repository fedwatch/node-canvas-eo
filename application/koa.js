const Koa = require('application/koa');
const compose = require('koa-compose');
const app = new Koa();

app.use(async (ctx ,next)  => {
    await  next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
    // ctx.body = 'Hello World';
});


app.use(async (ctx,next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time' , `${ms}ms`)
})

app.use(async (ctx,next) =>{

    await next()
    // ctx.body = 'Hello world'
})

app.use(async ctx => {

    ctx.set('WWW-Authenticate', 'Basic');
    ctx.body = {
        code:30001,
        msg:"Allowed for Images",
        data:[
            {id:1,title:"Image 1",url:"https://img.alicdn.com/d1x3u4a5e1R5a8b7x7R7x7v9d1c/1.png"}
        ]
    }
})

app.listen(3000);

