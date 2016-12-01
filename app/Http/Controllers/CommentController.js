'use strict'
const Comment = use('App/Model/Comment')
const Post = use('App/Model/Post')

class CommentController {

  * create (request, response) {
    let user = request.authUser
    let postId = request.param('id')
    let data = request.only('content')
    let post = yield Post.findBy('id')
    if (post) {
      let comments = yield Comment.create(data)
      response.status(201).json(comments)
    } else {
      response.status(404).json({text: 'post not found'})
    }
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
    let user = request.authUser
    let commentId = request.param('id')
    let comment = yield Comment.findBy('id', commentId)
    yield comment.delete()

    response.json({text: "comment has been deleted"})
  }

}

module.exports = CommentController
