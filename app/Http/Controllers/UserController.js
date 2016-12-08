'use strict'
const User = use("App/Model/User")
const Post = use("App/Model/Post")
const Comment = use("App/Model/Comment")
const Classe = use("App/Model/Classe")
const Hash = use('Hash')


class UserController {

	* userlist(request,response){
		let listUsers = yield User.all()
		response.status(200).json(listUsers)
	}


	* deleteUser(request,response){
		let user = request.authUser
		let userID = request.param('id')
		let data = request.all()
		if(user.admin==true){
			let reqdUser = yield User.findBy('id',userID)
			let userpostswrapper = yield Post.query().where('user_id',userID).fetch()
			let userposts = userpostswrapper.value()
			let usercommentswrapper = yield Comment.query().where('user_id',userposts.id).fetch()
			console.log(usercommentswrapper)
			let usercomments = userpostswrapper.value()
			
			for(let j=0; j<usercomments.length;j++){
					console.log('hi')

					//yield usercomments[j].delete()
				}
				//yield userposts.delete()
				response.status(201)
			}
			//yield reqdUser.delete()

			
			
		/*} else {
			response.status(403).send("Only admins are allowed to delete class")
		}*/


	}

	* signUp(request,response){
		let data = request.only('firstName','lastName','username','email','password')
		data.password = yield Hash.make(data.password)
		try {
			let user = yield User.create(data)
			response.status(201).json(user)
		} catch(e){
			response.status(400).send(e.message)
		}

	}

	* login(request,response){
		let data = request.only('username','password')
		let user = yield User.findBy('username',data.username)
		console.log(user)
		try{
			const token = yield request.auth.attempt(data.username,data.password)
			user.access_token = token
			response.status(200).json(user)
		} catch(e){
			response.status(401).unauthorized({error: e.message})
		}

	}

	* update(request,response){
		let user = request.authUser
		let userID = request.params('id')

		if(user.admin==true){
			let newAdmin = yield User.findBy(userID,'id')
			newAdmin.admin=true;
			yield newAdmin.save()
			response.status(200).json(newAdmin)
		}else{
			response.status(403).send("Only admins are allowed to make other users admins")
		}
	}
	* list(request,response){
		let listUsers = yield User.all()
		response.status(200).json(listUsers)
	}

	* updateClassId (request, response) {
		let user = request.authUser
		let data = request.only('className','instructor','campus','startDate')
		let reqdclass = yield Classe.query().where('className',data.className).andWhere('instructor',data.instructor)
		user.fill({ class_id: reqdclass[0].id})
		yield user.save()
		response.status(202).json(user)
		
	}






}

module.exports = UserController
