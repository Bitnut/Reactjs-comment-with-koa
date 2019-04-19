const api = require('../controller/user.js'); 
const router = require('koa-router')();

router.get('/getcomment/:id',api.getCommentById);
router.post('/newcomment',api.addComment);

module.exports = router; // 把router规则暴露出去
