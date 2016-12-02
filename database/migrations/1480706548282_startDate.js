'use strict'

const Schema = use('Schema')

class StartDateTableSchema extends Schema {

  up () {
    this.table('classes', (table) => {
      // alter start_date table
      table.date('startDate') //input-format YYYY-MM-DD
    })
  }

  down () {
    this.table('classes', (table) => {
      // opposite of up goes here
      this.dropColumn('startDate')
    })
  }

}

module.exports = StartDateTableSchema
