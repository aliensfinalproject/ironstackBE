'use strict'

const Post = use('App/Model/Post')

const Classe = use('App/Model/Classe')
const Comment = use('App/Model/Comment')

class PostController {

   * create (request, response) {
       let user = request.authUser
       let classID = request.param('id')
       let data = request.only("title", "content","category")
       data.user_id = user.id
       //data.class_id = user.class_id
       data.class_id = classID  // temp until user is tied to a class

       let post = yield Post.create(data)

       post.save()
       response.status(201).json(post)
   }

   * index (request, response) {
       let classID = request.param('id')
       let posts = yield Post.query().where('class_id',classID).orderBy('id','desc').fetch();
       response.status(200).json(posts)
 }

  * read(request,response){
    let user = request.authUser
    let posts = yield Post.query().where('user_id',user.id).orderBy('id','desc').fetch();
    response.status(200).json(posts)
  }

   * show (request, response){
       let postId = request.param("post_id")
       let post = yield Post.findBy("id", postId)
       response.status(200).json(post)
   }

   * update (request, response) {
     let user = request.authUser
     let postId = request.param('post_id')
     let post = yield Post.findBy("id", postId)
     let data = request.only ("title", "content", "category")
     if (post.user_id === user.id) {
       post.fill(data)
       yield post.save()
       response.status(201).json(post)
     } else {
       response.json({text: 'User not authorized to update post.'})
     }


   }

   * delete (request, response){
         let postId = request.param("post_id")
         let user = request.authUser
         let post = yield Post.findBy('id', postId)
         let comments = yield Comment.query().where('post_id',postId).fetch();
         console.log(comments)
          if (post.user_id === user.id){
            for(let i=0; i<comments.length;i++){
            yield comments[i].delete()
          }
           yield post.delete()
           response.status(200).json({text: "Post has been deleted."})
         } else {
            response.status(401).json({text: "User not authorized to delete post."})
                }
  
    }


}

module.exports = PostController
