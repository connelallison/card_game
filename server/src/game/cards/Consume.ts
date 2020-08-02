import Spell from '../Spell'

class Consume extends Spell {
  constructor (game, owner, zone) {
    super(
      game, 
      owner, 
      zone, 
      'Consume', 
      'Consume', 
      3,
      'Deal 3 damage to the weakest enemy minion and draw a card.',
      [game.effects.damageWeakestEnemyMinion(3), game.effects.drawCards()],
      false,
      null,
      null
    )
  }
}
export default Consume
