const db = require('../config/default') // 引入user的表结构
const commentsModel = '../schema/comments.js'
const ForumDb = db.Forum // 引入数据库

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Comment = ForumDb.import(commentsModel)

// 评论操作

const countCommentFloor = async function (newComment) {
    if (newComment.parent_id === '') {
        var result1 = await Comment.count({
            where: {
                post_id: newComment.post_id,
                parent_id: '',
            }
        }
        )
        return ++result1
    } else {
        var result2 = await Comment.count({
            where: {
                post_id: newComment.post_id,
                parent_id: newComment.parent_id
            }
        }
        )
        return ++result2
    }
}

const addNewComment = async function (newComment) {
    const floor = await countCommentFloor(newComment);
    const comment = await Comment.create(
        {
            id: null,
            post_id: '1',
            parent_id: newComment.parent_id,
            user_name: newComment.user_name,
            content: newComment.content,
            format_time: newComment.format_time,
            time_string: newComment.time_string,
            floor: floor,
            likes: 0
        }
    )
    return comment

    
    
}

const getCommentList = async function (Id) {
    const result = await Comment.findAll(
        {
            where: {
                post_id: Id
            }
        }
    )
    const commentList = []
    const replyList = []
    const length = result.length;
    for(var i=0; i<length; i++) {
        if(result[i].parent_id === '') {
            commentList.push(
                {
                    id: result[i].id,
                    post_id: result[i].post_id,
                    parent_id: '',
                    user_name: result[i].user_name,
                    content: result[i].content,
                    format_time: result[i].format_time,
                    time_string: result[i].time_string,
                    floor: result[i].floor,
                    likes: result[i].likes,
                    replyList: []
                }
            )
        } else {
            replyList.push(
                {
                    parent_id: result[i].parent_id,
                    reply: {
                        id: result[i].id,
                        post_id: result[i].post_id,
                        parent_id: result[i].parent_id,
                        user_name: result[i].user_name,
                        content: result[i].content,
                        format_time: result[i].format_time,
                        time_string: result[i].time_string,
                        floor: result[i].floor,
                        likes: result[i].likes,
                    }
                }
            )
        }
    }
    for(var i=0; i<replyList.length; i++) {
        for(var k=0; k<commentList.length; k++) {
            if (replyList[i].parent_id === commentList[k].id.toString()) {
                commentList[k].replyList.push(replyList[i].reply)
                break;
            }
        }
    }
    return commentList;
}









module.exports = {
  addNewComment,
  getCommentList
}
