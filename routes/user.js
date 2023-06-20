const Router = require('koa-router')
const tools = require('../utils/tools')
const channel = require('../utils/channel')
const { addToken, provingToken } = require('../utils/token')
const UserModel = require('../models/user')
const helper = require('../dbhelper/userDbhelper')

const router = new Router()

router.post('/register', async (ctx, next) => {
  let data = ctx.request.body
  const user = await helper.findUser({ account: data.account })
  if (user) {
    return ctx.body = { message: '账户名已注册', status: '10003' }
  }
  let page = new UserModel(data)
  try {
    page = await page.save()
    ctx.body = { message: '注册成功', status: '10000' }
  } catch (e) {
    ctx.body = { message: '注册失败', status: '10001' }
  }
  await next()
})

router.post('/login', async (ctx, next) => {
  console.log('登录...');

  let data = ctx.request.body
  const user = await helper.findUser({ account: data.account })
  if (!user) return ctx.body = { message: '账户不存在', status: '10001' }
  if (user.password !== data.password) return ctx.body = { message: '账户或密码不正确', status: '10001' }
  let token = addToken({ id: user.id, account: user.account })
  let { _id, account, userName, portrait } = user
  let userInfo = { userId: _id, account, userName, portrait }
  ctx.body = { message: '登录成功', status: '10000', token, userInfo }
  await next()
})

router.post('/test', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  if (token) {
    let res = provingToken(token);
    if (res && res.exp <= new Date() / 1000) {
      ctx.body = {
        message: 'token过期',
        code: 3
      };
    } else {
      ctx.body = {
        message: '解析成功',
        code: 1
      }
    }
  } else {  // 没有取到token
    ctx.body = {
      msg: '没有token',
      code: 0
    }
  }

  await next()
})


module.exports = router