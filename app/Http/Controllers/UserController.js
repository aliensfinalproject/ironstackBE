'use strict'
const User = use("App/Model/User")
const Hash = use('Hash')


class UserController {

	* list(request,response){
		let listUsers = yield User.all()
		response.status(200).json(listUsers)
	}


	* deleteUser(request,response){
		let user = request.authUser
		let userID = request.param('id')
		let data = request.all()
		if(user.admin==true){
			let removeUser = yield User.findBy(userID,'id')
			yield removeUser.delete()
			response.status(201)
		} else {
			response.status(403).send("Only admins are allowed to delete class")
		}


	}

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
		let data = request.only('class_id')
		user.class_id = data.class_id
		if (user) {
			yield user.save()
			response.status(200).json(user)
		} else {
			response.json({text: 'Class does not exist'})
		}
	}




}

module.exports = UserController
