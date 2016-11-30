'use strict'

const Schema = use('Schema')

class ClassesTableSchema extends Schema {

  up () {
    this.create('classes', (table) => {
      table.increments()
      table.timestamps()
      table.string('className')
      table.string('instructor')
      table.string('campus')
    })
  }

  down () {
    this.drop('classes')
  }

}

module.exports = ClassesTableSchema
