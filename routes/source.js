const Router = require('koa-router')
const koa2Req = require('koa2-request')
const axios = require('axios')

const router = new Router()

router.prefix('/source')

router.post('/cross', async (ctx, next) => {
  let options = {
    url: ctx.request.body.url,
    method: ctx.request.body.method,
    params: ctx.request.body.params
  }

  res = await httpRequest(options)

  ctx.body = res.data
  ctx.status = 200
  await next()
})

const httpRequest = async options => {
  let result = {}

  if (options.method == 'post') {
    result = await axios({
      url: options.url,
      method: options.method,
      data: options.params,
      responseType: 'arraybuffer'
    })
  }

  if (options.method == 'get') {
    result = await axios.get(options.url, {
      params: options.params
    })
  }
  return result
}

module.exports = router
