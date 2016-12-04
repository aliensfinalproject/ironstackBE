'use strict'
const Comment = use('App/Model/Comment')

class CommentController {

  * create (request, response) {
    let user = request.authUser
    let postId = request.param('id')
    let data = request.only('content')
    data.user_id = user.id

   // let post = yield Post.findBy('id', postId)
    data.post_id = postId
    //if (post) {
      let comments = yield Comment.create(data)
      response.status(201).json(comments)
    //}
  }

  * index (request, response) {
    let postId = request.param('id')
    let comments = yield Comment.query().where('post_id', postId).fetch()
		response.status(200).json(comments)
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
