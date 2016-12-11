'use strict'
const Post = use('App/Model/Post')
const Classe = use('App/Model/Classe')
const Comment = use('App/Model/Comment')

class SlackController {

   * listener (request, response) {
   	console.log(request)
   	let slackrequest = request.only('token','user_name','text','trigger_word')
   	if(slackrequest.token == 'u5YSLxGqxItuyHbP9LS6sFIj'){
   		let category = slackrequest.trigger_word == '#Question' ? 'question' : 'status'
	   	let postText = slackrequest.text.replace("#Question","")
	   	let data = {"title": postText, "category": category, "user_id": 1, "class_id":3}
	   	let slackPost = yield Post.create(data)
	   	response.status(200).json({"text":"Post created."})
   	} else {
   		response.status(401).json('User not Authorized')
   	}
   	
      
   }

}

module.exports = SlackController
