'use strict'
const User = use("App/Model/User")
const Hash = use('Hash')


class UserController {
	* signUp(request,response){
		let data = request.all()
		data.password = yield Hash.make(data.password)
		try {
			let user = yield User.create(data)
			response.status(201).json(user)
		} catch(e){
			response.status(400).send(e.message)
		}

	}

	* login(request,response){
		let data = request.only('userName','password')
		let user = yield User.findBy('userName',data.userName)
		try{
			const token = yield request.auth.attempt(data.userName,data.password)
			user.access_token = token
			response.status(200).send(user)
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
			response.status(401).send("Only admins are allowed to make other users admins")
		}
	}
	* list(request,response){
		let listUsers = yield User.all()
		response.status(200).json(listUsers)
	}




}

module.exports = UserController
