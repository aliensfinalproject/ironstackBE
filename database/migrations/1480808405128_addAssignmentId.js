'use strict'

const Schema = use('Schema')

class AddAssignmentIdTableSchema extends Schema {

  up () {
    this.table('posts', (table) => {
      table.integer('assignment_id')
    })
  }

  down () {
    this.table('posts', (table) => {
      table.dropColumn('assignment_id')
    })
  }

}

module.exports = AddAssignmentIdTableSchema
