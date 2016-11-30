'use strict'

const Post = use('App/Model/Post')
// const Comment = use('App/Model/Comment')

class PostController {

    * create (request, response) {
        let data = request.only('title', 'content')

        let post = yield Post.create(data)

        post.save()
        response.status(201).json(post)
    }

    * show(request, response){
        let post_id = request.param("post_id")
        let post = yield Post.findBy('id', post_id)
        response.status(201).json(post)
    }

        if (!post){
            response.status(404).json({text: "Post not found"})
        } else {
            post.fill(data)
            yield post.save()
            response.status(201).json(post)
        }

    }

module.exports = PostController
