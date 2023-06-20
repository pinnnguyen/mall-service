const mongoose = require("mongoose");

const prijectSchema = new mongoose.Schema({
    id: { type: String },        // 项目id
    userId: { type: String },    // 用户id
    name: { type: String },      // 项目名字
    type: { type: String },      // 项目类型
    industry: { type: String },  // 所属行业
    config: { type: Object },    // 项目配置
    logo: { type: String },      // 项目logo
    cover: { type: String },     // 项目封面
    pages: { type: Array },      // 页面集合
});

const ProjectModel = mongoose.model("project", prijectSchema, 'project');
module.exports = ProjectModel



