const Router = require('koa-router')
const tools = require('../utils/tools')
const fs = require('fs')
const config = require('../config')
const router = new Router()

router.post('/base64ToImg', async (ctx, next) => {
  let data = ctx.request.body.data

  let name = tools.getRandomCode(6) + Date.now() + '.png'

  let imgPath = `${config.serviceApi}/img/${name}`
  let base64 = data.replace(/^data:image\/\w+;base64,/, '')
  var dataBuffer = new Buffer(base64, 'base64') //把base64码转成buffer对象，

  fs.writeFile('/img/' + name, dataBuffer, function (err) {
    if (err) {
      console.log(err)
    } else {
    }
  })
  ctx.body = {
    status: 10000,
    data: imgPath,
    messsage: '图片加载成功！'
  }
  ctx.status = 200
  await next()
})

module.exports = router
