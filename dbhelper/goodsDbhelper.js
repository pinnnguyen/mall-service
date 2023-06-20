const mongoose = require('mongoose')
const goodsModel = mongoose.model('goods')
const channel = require('../utils/channel')

const helper = {
    findAll: (params) => {
        return new Promise((resolve, reject) => {
            goodsModel.find({ projectId: { $eq: params.projectId }, name: { $regex: params.name } }, { richText: 0 }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    findIds: (id) => {
        return new Promise((resolve, reject) => {
            goodsModel.find({ projectId: { $eq: id } }, { richText: 0 }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {
            goodsModel.findById(id, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    channel.mappingId(data)
                    resolve(data)
                }
            })
        });
    },
    // 编辑
    edit: (data) => {
        return new Promise((resolve, reject) => {
            goodsModel.updateOne({ _id: data.id }, data, (err, d) => {
                if (err) {
                    reject({ message: '编辑失败', status: 10001 })
                } else {
                    resolve({ message: '编辑成功', status: 10000, id: data.id })
                }
            })
        })
    }
}

module.exports = helper