'use strict'
const Classe = use("App/Model/Classe")

class ClassController {

	* addClass(request,response){
		let user = request.authUser
		let data = request.all()
		if(user.admin==true){
			let newClass = yield Classe.create(data)
			response.status(201).json(newClass)
		} else {
			response.status(401).send("Only admins are allowed to make other users admins")
		}

	}

}

module.exports = ClassController
