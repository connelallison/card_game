import GamePlayer from "../gameObjects/GamePlayer"
import GameObject from "../gameObjects/GameObject"
import Character from "../gameObjects/Character"
import TargetRequirementFactory from "../interfaces/TargetRequirementFactory"

const TargetRequirements: {[index: string]: TargetRequirementFactory} = {
    minAttack: (minAttack: number) => (controller: GamePlayer, objectSource: GameObject, charSource: Character, target: Character) => (target.attack >= minAttack),
    maxAttack: (maxAttack: number) => (controller: GamePlayer, objectSource: GameObject, charSource: Character, target: Character) => (target.attack <= maxAttack),
    friendlyTarget: () => (controller: GamePlayer, objectSource: GameObject, charSource: Character, target: Character) => (objectSource.controller() === target.controller()),
    enemyTarget: () => (controller: GamePlayer, objectSource: GameObject, charSource: Character, target: Character) => (objectSource.controller() !== target.controller()),
    notSelf: () => (controller: GamePlayer, objectSource: GameObject, charSource: Character, target: Character) => (charSource !== target),
    isSelf: () => (controller: GamePlayer, objectSource: GameObject, charSource: Character, target: Character) => (charSource === target),
}

export default TargetRequirements