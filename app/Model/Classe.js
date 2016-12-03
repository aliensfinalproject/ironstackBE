'use strict'

const Lucid = use('Lucid')

class Classe extends Lucid {

	users(){
    	return this.belongsTo('App/Model/User')
	}
	startdate(){
		return this.hasOne('App/Model/Classe')
	}

	assignments(){
		return this.hasMany('App/Model/Assignment')
	}

}

module.exports = Classe
