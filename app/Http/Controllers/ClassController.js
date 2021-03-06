'use strict'
const Classe = use("App/Model/Classe")

class ClassController {

	*read(request,response){
		let listclasses = yield Classe.all()
		response.status(200).json(listclasses)

	}
	* addClass(request,response){
		let user = request.authUser
		let data = request.all()
		if(user.admin==true){
			let newClass = yield Classe.create(data)
			response.status(201).json(newClass)
		} else {
			response.status(403).send("Only admins are allowed to create classes")
		}
	}
	* singleClass(request,response){
		let user = request.authUser
		let classID = request.param('id')
		if(user.admin==true){
			let reqdClass = yield Classe.findBy(classID,'id')
			console.log(reqdClass)

			response.status(200).json(reqdClass)
		}else {
			response.status(403).send("Only admins can access class")
		}		

	}

	* editClass(request,response){
		let user = request.authUser
		let classID = request.param('id')
		console.log(classID);
		let data = request.all()

		if(user.admin==true){
			let editClass = yield Classe.findBy(classID,'id')
			console.log(editClass)
			editClass.fill(data)
			yield editClass.save()
			response.status(201).json(editClass)
		} else {
			response.status(403).send("Only admins are allowed to edit class")
		}

	}

	* deleteClass(request,response){
		let user = request.authUser
		let classID = request.param('id')
		let data = request.all()
		if(user.admin==true){
			let removeClass = yield Classe.findBy(classID,'id')
			yield removeClass.delete()
			response.status(201)
		} else {
			response.status(403).send("Only admins are allowed to delete class")
		}


	}

}

module.exports = ClassController
