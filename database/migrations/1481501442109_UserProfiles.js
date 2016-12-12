'use strict'

const Schema = use('Schema')

class UserProfilesTableSchema extends Schema {

  up () {
    this.create('UserProfiles', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.string('slackusername')
      table.string('image_url')
    })
  }

  down () {
    this.drop('UserProfiles')
  }

}

module.exports = UserProfilesTableSchema
