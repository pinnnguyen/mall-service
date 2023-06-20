const { addToken, provingToken } = require('./token')

const resultChannel = function (ctx, result) {
    if (result) {
        ctx.body = {
            data: result
        }
        ctx.status = 200
    } else {
        ctx.throw(200, '未找到数据');
    }
}

const mappingId = function (data) {
    if (data instanceof Array) {
        data.map(item => item.id = item._id)
    }

    if (data instanceof Object) {
        data.id = data._id
    }
}

const getTokenInfo = function (ctx) {
    let token = ctx.request.header.authorization;
    return token ? provingToken(token) : null
}

module.exports = {
    resultChannel,
    mappingId,
    getTokenInfo
}