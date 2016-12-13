'use strict'
const Note = use('App/Model/Note')

class NoteController {

  * create (request, response) {
    let user = request.authUser
    let data = request.only('content')
    console.log(data)
    data.user_id = user.id
    let note = yield Note.create(data)

    response.status(201).json(note)
  }

  * read (request, response) {
    let user = request.authUser
    let notes = yield Note.findBy('user_id',user.id)
		response.status(200).json(notes)
  }
  


}

module.exports = NoteController
