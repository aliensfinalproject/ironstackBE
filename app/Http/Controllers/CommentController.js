'use strict'
const Comment = use('App/Model/Comment')

class CommentController {

  * create (request, response) {
    let user = request.authUser
    let postId = request.param('id')
		let data = request.only('content')
		// data.post_id = postId;
		let comments = yield Comment.create(data)

		response.status(201).json(comments)
  }

  * index (request, response) {}

  * update (request, response) {}

  * delete (request, response) {}

}

module.exports = CommentController
