'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  post () {
    return this.belongsTo('App/Model/Post')
  }

}

module.exports = Comment
