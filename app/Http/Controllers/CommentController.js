'use strict'
const Comment = use('App/Model/Comment')

class CommentController {

  * create (request, response) {
    let user = request.authUser
    let postId = request.param('id')
		let data = request.only('content')
		data.post_id = postId;
		let comments = yield Comment.create(data)

		response.status(201).json(comments)
  }

  * index (request, response) {
    let listComments = yield Comment.all()
		response.status(200).json(listComments)
  }

  * update (request, response) {
    let commentId = request.param('id')
    let data = request.only ("content")
    let comment = yield Comment.findBy("id", commentId)
    data.user_id = request.authUser.id
    comment.fill(data)
    yield comment.save()
    response.status(201).json(comment)
  }

  * delete (request, response) {
    let commentId = request.param('id')
    let comment = yield Comment.findBy('id', commentId)
    yield comment.del()

    response.json({text: "comment has been deleted"})
  }

}

module.exports = CommentController
