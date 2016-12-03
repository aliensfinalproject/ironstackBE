'use strict'

const Schema = use('Schema')

class AssignmentTableSchema extends Schema {

  up () {
    this.create('assignment', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.string('description')
      table.integer('week')
      table.integer('class_id')
      table.foreign('class_id').references('classes.id')
      table.boolean('enabled').defaultTo(false)
    })
  }

  down () {
    this.drop('assignment')
     
  }
}


module.exports = AssignmentTableSchema
