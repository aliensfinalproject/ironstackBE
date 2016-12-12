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

	comments () {
		return this.hasMany('App/Model/Comment')
	}
	class(){
		return this.hasOne('App/Model/Classe')
	}

	notes () {
		return this.hasMany('App/Model/Note')
	}


}

module.exports = User
