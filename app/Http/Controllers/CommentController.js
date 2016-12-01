'use strict'
const Comment = use('App/Model/Comment')
const Post = use('App/Model/Post')

class CommentController {

  * create (request, response) {
    let user = request.authUser
    let postId = request.param('id')
    let data = request.only('content')
    data.user_id = user.id

    let post = yield Post.findBy('id', postId)
    data.post_id = post.id
    if (post) {
      let comments = yield Comment.create(data)
      response.status(201).json(comments)
    }
  }

  * index (request, response) {
    let listComments = yield Comment.all()
		response.status(200).json(listComments)
  }

  * update (request, response) {
    let user = request.authUser
    let commentId = request.param('id')
    let comment = yield Comment.findBy("id", commentId)
    let data = request.only ("content")
    if (comment.user_id === request.authUser.id) {
      comment.fill(data)
      yield comment.save()
      response.status(201).json(comment)
    } else {
      response.json({text: "User not authorized to update comment."})
    }

  }

  * delete (request, response) {
    let user = request.authUser
    let commentId = request.param('id')
    let comment = yield Comment.findBy('id', commentId)
    if (comment.user_id === request.authUser.id) {
      yield comment.delete()
      response.json({text: "comment has been deleted"})
    } else {
      response.json({text: "User not authorized to delete comment."})
    }
  }

}

module.exports = CommentController
