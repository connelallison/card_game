const Minion = require('../Minion.js')

class JuniorOrc extends Minion {
  constructor () {
    super('JuniorOrc', 3, 4, 3)
    this.name = 'Junior Orc'
  }
}

module.exports = JuniorOrc
