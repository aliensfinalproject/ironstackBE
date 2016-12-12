'use strict'

const Schema = use('Schema')

class NotesTableSchema extends Schema {

  up () {
    this.create('notes', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id')
      table.foreign('user_id').references('users.id')
      table.text('content')
    })
  }

  down () {
    this.drop('notes')
  }

}

module.exports = NotesTableSchema
