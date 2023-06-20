const tools = require('../utils/tools')
const multer = require('koa-multer');
const Router = require('koa-router')
const config = require('../config')

const router = new Router()


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/img/')
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})

var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    data: `${config.serviceApi}/img/${ctx.req.file.filename}`,
    errorCode: "00000",
    message: "请求成功",
  }
  ctx.status = 200
})

module.exports = router

