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

	* editClass(request,response){
		let user = request.authUser
		let classID = request.params('classId')
		console.log(classID);
		let data = request.all()

		if(user.admin==true){
			let editClass = yield Classe.findBy(classID,'id')
			console.log('id')
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
		let classID = request.params('classId')
		let data = request.all()
		if(user.admin==true){
			let removeClass = yield Classe.findBy(classID,'id').delete()
			response.status(201).json(editClass)
		} else {
			response.status(403).send("Only admins are allowed to delete class")
		}


	}

}

module.exports = ClassController
