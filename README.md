# Reactjs-comment-with-koa


本项目方便使用 reactjs + koa + redux 的同志 快速完成 评论系统的创建，直接复制代码，修改引用路径即可使用，方便快捷不造轮子！

下面是这个组件的类的设计和描述：

CommentApp：这个类是评论功能的父类，它包含了commentInput和commentList两个子类。同时它也是监听store的smart组件。
	 
CommentList：这个类是评论的容器类，它包含了一个评论列表。
	
CommentInput：这个是一个输入组件，它的功能主要是让用户能够评论文章内容。
	
Comment：comment类是负责展示一条评论及其回复列表的类，它有两个子类分别是ReplyEditor和ReplyList。
	 
ReplyEditor：这个是一个输入组件，它的功能主要是让用户能够回复评论内容。
	 
ReplyList：这个类是回复列表的容器类，它包含了一个回复列表。
