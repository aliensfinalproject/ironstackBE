'use strict'

const Schema = use('Schema')

class AddclassTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.integer('class_id')
    })
  }

  down () {
    this.table('users', (table) => {
      // opposite of up goes here
      table.dropColumn('class_id')

    })
  }

}

module.exports = AddclassTableSchema
