const user = require('../models/mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var fs = require("fs");  
var path = require("path");

// 评论的获取和添加
const getCommentById = async function (ctx) {
    const id = Number(ctx.params.id)
    result = await user.getCommentList(id);
    if (result) {
        ctx.body = {
            success: true,
            commentList: result,
            info: '获取评论成功！'
        }
    } else {
        ctx.throw(404)
    }
}
const addComment = async function (ctx) {
    const data = ctx.request.body
    const result = await user.addNewComment(data);
    if (result) {
        ctx.body = {
            success: true,
            comment: result,
            info: '添加评论成功！'
        }
    } else {
        ctx.throw(404)
    }
}


module.exports = {
    getCommentById,
    addComment
}
