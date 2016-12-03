'use strict'

const Lucid = use('Lucid')

class Assignment extends Lucid {

  class(){
      return this.belongsTo('App/Model/Classe')
    }
}

module.exports = Assignment
