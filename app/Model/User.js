'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
	static get hidden(){
		return ['password']
	}


  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

	posts () {
    return this.hasMany('App/Model/Post')
  }
}

module.exports = User
