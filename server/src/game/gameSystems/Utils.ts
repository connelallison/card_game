import Game from "./Game"

class Utils {
    game: Game
    constructor(game: Game) {
        this.game = game
    }

    shuffle(array: any[]): void {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
        }
    }

    forEachBackward(array: any[], callback) {
        for (let i = array.length - 1; i >= 0; i--) {
            callback(array[i])
        }
    }

    findBackward(array: any[], callback) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (callback(array[i])) return array[i]
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

    notBehindGuard(character: Character) {
        return character.flags.guard || character.controller().board.every(follower => follower.flags.guard !== true)
    }
}

export default Utils

import Character from "../gameObjects/Character";import GameObject from "../gameObjects/GameObject";

