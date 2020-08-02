import Spell from '../Spell'

class Fireburst extends Spell {
  constructor (game, owner, zone) {
    super(
      game, 
      owner, 
      zone, 
      'Fireburst', 
      'Fireburst', 
      1, 
      'Deal 3 damage to a minion with 4 or more attack.',
      [game.effects.damageChosenTarget(3)],
      true, 
      game.utils.targetDomain(['enemyMinions', 'friendlyMinions',]),
      [game.constraints.minAttack(4)], 
    )
  }
}
export default Fireburst
