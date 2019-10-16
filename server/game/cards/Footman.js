const Minion = require('../Minion.js')

class Footman extends Minion {
  constructor () {
    super('Footman', 2, 2, 4)
    this.name = 'Footman'
  }
}
module.exports = Footman
