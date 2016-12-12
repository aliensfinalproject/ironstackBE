'use strict'
const Post = use('App/Model/Post')
const Classe = use('App/Model/Classe')
const Comment = use('App/Model/Comment')
const UserProfile = use('App/Model/UserProfile')
const User = use('App/Model/User')


class SlackController {

   * listener (request, response) {
   	console.log(request)
   	let slackrequest = request.only('token','user_name','text','trigger_word')
   	if(slackrequest.token == 'u5YSLxGqxItuyHbP9LS6sFIj'){
   		let category = slackrequest.trigger_word == '#Question' ? 'question' : 'status'
	   	let postText = slackrequest.text.replace("#Question","")
	   	let userprofile = yield UserProfile.findBy('slackusername',slackrequest.user_name)
	   	if(userprofile){
	   		let user = yield User.findBy('id',userprofile.user_id)
		   	let data = {"title": postText, "category": category, "user_id": user.id, "class_id":user.class_id}
		   	let slackPost = yield Post.create(data)
		   	response.status(200).json({"text":"Post created: <http://localhost:8081/#/class/postDetails/"+user.class_id+"/"+slackPost.id+">"})
		   }else{
		   	response.status(400).json({'errorText':'SlackUser does not exits'})
		   }

	   	} else {
	   		response.status(401).json({'errorText':'User not Authorized'})
	   	}




   }
   * slackConnect(request,response){
		let data = request.only('slackusername','image_url')
		console.log(data)
		let user = request.authUser
		data.user_id = user.id
		let slackprofile = yield UserProfile.create(data)
		response.status(201).json(slackprofile)

	}

  * readProfile (request, response) {
    let profiles = yield UserProfile.all()
		response.status(200).json(profiles)
  }





}

module.exports = SlackController
