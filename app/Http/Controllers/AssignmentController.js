'use strict'
const Assignment = use("App/Model/Assignment")
const Classe = use('App/Model/Classe')

class AssignmentController {

  * create (request, response) {
   let user = request.authUser
   if (user.admin) {
     let data = request.only('title','description', 'enabled', 'week', 'class_id')

     let assignment = yield Assignment.create(data)
     response.status(201).json(assignment)
   } else {
     response.status(401).json({text: 'User not authorized'})
   }

 }

 * index (request, response) {
   let classID = request.param('id')
   let assignments = yield Assignment.query().where('enabled', true).andWhere('class_id', classID).orderBy('week','asc')
   console.log("class id is: ", classID)
   console.log("Assignments array: ", assignments)
   if (assignments.length) {
     response.status(200).json(assignments)
   } else {
     response.status(401).json({text: 'No enabled assignments.'})
   }

 }

 * show (request, response) {
   let assignmentId = request.param('id')
   let assignment = yield Assignment.findBy('id', assignmentId)
   response.status(200).json(assignment)
 }

 * update (request, response) {
   let user = request.authUser
   if (user.admin){
     let assignmentId = request.param('id')
     let assignment = yield Assignment.findBy('id', assignmentId)
     let data = request.all()
     if (assignment) {
       assignment.fill(data)
       yield assignment.save()
       response.status(201).json(assignment)
     } else {
       response.json({text: 'Assignment not found'})
     }
   } else {
     response.json({text: 'User not authorized'})
   }

 }

 * delete (request, response) {
   let user = request.authUser
   if (user.admin) {
     let assignmentId = request.param('id')
     let assignment = yield Assignment.findBy('id', assignmentId)
     if (assignment) {
       yield assignment.delete()
       response.json({text: 'Assignment has been deleted'})
     } else {
       response.json({text: 'Assignment not found'})
     }
   } else {
     response.json({text: 'User not authorized'})
   }
 }

 // * test (request, response) {
 //   let user = request.authUser
 //   let assignmentId = request.param('title', 'description')
 //   let assignments = yield Assignment.query().where('title', data.title)
 //   if (assignments) {
 //     assignments.description = data.description
 //     response.json(assignments)
 //   }
 //
 // }

}

module.exports = AssignmentController
