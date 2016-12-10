'use strict'
const Post = use('App/Model/Post')
const Classe = use('App/Model/Classe')
const Comment = use('App/Model/Comment')

class SlackController {

   * listener (request, response) {
   	console.log(request)
   	let slackrequest = request.only('token','user_name','text','trigger_word')
   	let category = slackrequest.trigger_word == '#Question' ? 'question' : 'status'
   	let data = {"title": slackrequest.text, "category": category, "user_id": 1, "class_id":3}
   	let slackPost = yield Post.create(data)
   	console.log(slackPost)

      //  let user = request.authUser
      //  let classId = request.param('id')
      //  let data = request.only("title", "content","category")
      //  data.user_id = user.id
      //  data.class_id = classId
      // // data.assignment_id = assignmentId

      //  let post = yield Post.create(data)

      //  response.status(201).json(post)
      response.status(200).json({"text":"Post created."})
   }

}

module.exports = SlackController
