'use strict'

const Schema = use('Schema')

class AddingAssignmentTableSchema extends Schema {

  up () {
    this.table('posts', (table) => {
      this.integer(assignment_id)
    })
  }

  down () {
    this.table('posts', (table) => {

      table.dropColumn('assignment_id')
    })
  }

}

module.exports = AddingAssignmentTableSchema
