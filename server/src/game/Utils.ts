import Game from "./Game"

class Utils {
    game: Game
    constructor(game: Game) {
        this.game = game
    }

    shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
        }
    }

    findMinByCriterion(array, criterion) {
        let minObj
        if (array.length > 0) {
            minObj = array[0]
            array.forEach(obj => {
                if (criterion(obj) < criterion(minObj)) minObj = obj
            })
        }
        return minObj
    }

    targetDomain(zones) {
        return (player) => {
            const targetDomain = []
            zones.forEach(zone => {
                switch (zone) {
                    case 'enemyMinions':
                        targetDomain.push(...player.opponent.board)
                        break
                    case 'enemyHero':
                        targetDomain.push(player.opponent.hero)
                        break
                    case 'friendlyMinions':
                        targetDomain.push(...player.board)
                        break
                    case 'friendlyHero':
                        targetDomain.push(player.hero)
                        break
                    default:
                        break
                }
            })
        return targetDomain
        }
    }

    notBehindTaunt(character) {
        return character.flags.taunt || character.controller().board.every(minion => minion.flags.taunt !== true)
    }
}

export default Utils