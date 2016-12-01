'use strict'

const Lucid = use('Lucid')

class Post extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  comment () {
    return this.hasMany('App/Model/Comment')
  }

}

module.exports = Post
