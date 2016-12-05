'use strict'

const Schema = use('Schema')

class AssignmentsTableSchema extends Schema {

  up () {
    this.create('assignments', (table) => {
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
    this.drop('assignments')

  }
}


module.exports = AssignmentsTableSchema
