'use strict'

const Post = use('App/Model/Post')

const Classe = use('App/Model/Classe')

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
         const post_list = yield Post.query().table('posts')
         .where('id', postId)

         for (var i=0; i<post_list.length; i++){
             console.log(post_list[i])
             let deletedPost = yield Post.find(post_list[i].id)
         }

         let post = yield Post.findBy('id', postId)
         post_list.user_id = user.id
         user.id = post.id

           if (post.user_id === request.authUser.id) {
             yield post.delete()
             response.json({text: "Post has been deleted."})
                }else {
                    response.json({text: "User not authorized to delete post."})
                }


         if (!post){
             response.status(404).json({text: "Post cannot be found."})
         } else {
               yield post.delete()
               response.status(201).json({text: "Post has been deleted.", post:post})
         }

   }


}

module.exports = PostController
