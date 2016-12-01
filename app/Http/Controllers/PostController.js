'use strict'

const Post = use('App/Model/Post')

class PostController {

    * create (request, response) {
        let user = request.authUser
        let data = request.only("title", "content")
        data.user_id = user.id

        let post = yield Post.create(data)

        post.save()
        response.status(201).json(post)
    }

    * index (request, response) {
    let posts = yield Post.all()
    response.status(200).json(posts)
  }

    * show (request, response){
        let postId = request.param("post_id")
        let post = yield Post.findBy("id", postId)
        response.status(200).json(post)
    }

    * update (request, response) {
      let postId = request.param('post_id')
      let data = request.only ("title", "content", "category")
      let post = yield Post.findBy("id", postId)
      data.user_id = request.authUser.id
      post.fill(data)
      yield post.save()
      response.status(201).json(post)

    }

    * delete (request, response){

  		let postId = request.param("post_id")

  		const post_list = yield Post.query().table('posts')
  		.where('id', postId)

  		for (var i=0; i<post_list.length; i++){
  			console.log(post_list[i])
  			let deletedPost = yield Post.find(post_list[i].id)
  		}

  		let post = yield Post.findBy('id', postId)

  		if (!post){
  			response.status(404).json({text: "Post cannot be found."})
  		} else {
  	  		yield post.delete()
  	  		response.status(201).json({text: "Post has been deleted.", post:post})
  		}
    }
    
}

module.exports = PostController
