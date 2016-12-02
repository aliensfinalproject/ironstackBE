'use strict'
const Assignment = use('App/Model/Assignment')

class AssignmentController {

  * create (request, response) {
    let user = request.authUser
    // let classId = user.class_id
    if (user.admin) {
      let data = request.all()
      // data.class_id = classId
      let assignment = yield Assignment.create(data)
      response.status(201).json(assignment)
    } else {
      response.status(401).json({text: 'User not authorized'})
    }

  }

  * index (request, response) {
    let assignments = yield Assignment.query().where('enabled', 1).fetch()
    if (assignments) {
      response.status(200).json(assignments)
    } else {
      response.status(401).json({text: 'Assignment not enabled'})
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

}

module.exports = AssignmentController
