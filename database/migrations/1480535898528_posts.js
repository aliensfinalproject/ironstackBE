'use strict'

const Schema = use('Schema')

class PostsTableSchema extends Schema {

  up () {
    this.create('posts', (table) => {
        table.increments()
        table.timestamps()
        table.string('title')
        table.string('content')
        table.string('category')
        table.integer('user_id')
        table.foreign('user_id').references('users.id')
        table.integer('class_id')
        table.foreign('class_id').references('classes.id')
        // table.integer('assignment_id')
        // table.foreign('assignment_id').references('assignments.id')
        //     //check what it's called when Ashima makes table

    })

  }

  down () {
    this.drop('posts')
  }

}

module.exports = PostsTableSchema
