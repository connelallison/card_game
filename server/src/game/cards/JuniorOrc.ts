import Minion from '../gameObjects/Minion'
import Enchantment from '../gameObjects/Enchantment'
import Game from '../Game'
import Card from '../gameObjects/Card'
import GamePlayer from '../gameObjects/GamePlayer'

class JuniorOrcDamageAura extends Enchantment {
    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'JuniorOrc:DamageAura', 
            'Fury', 
            ['board'],
            ['minion'],
            (enchantment) => (true),
            true,
            'static',
            {
              effect: (stats, value) => (stats.attack += value),
              value: 1,
              category: 'stats',
              types: {
                minion: ['board'],
                // hero: ['hero']
              },
              targetRequirement: (target, source) => (source.owner.owner === target.owner && source.owner !== target)
            }
        )
    }
}
class JuniorOrc extends Minion {
  constructor (game: Game, owner: GamePlayer, zone: string) {
    super(game, owner, zone, 'JuniorOrc', 'Junior Orc', 2, 3, 3, 'Your other minions have +1 Attack.', null, false, null, null)
    this.enchantments.aura.stats.push(new JuniorOrcDamageAura(this.game, this))
  }
}

export default JuniorOrc
