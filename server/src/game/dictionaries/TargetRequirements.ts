import GameObject from "../gameObjects/GameObject"
import Character from "../gameObjects/Character"
import TargetRequirementFactory from "../functionTypes/TargetRequirementFactory"

const TargetRequirements: {[index: string]: TargetRequirementFactory} = {
    minAttack: (minAttack: number) => (source: GameObject, target: Character) => (target.attack >= minAttack),
    maxAttack: (maxAttack: number) => (source: GameObject, target: Character) => (target.attack <= maxAttack),
    friendlyTarget: () => (source: GameObject, target: Character) => (source.controller() === target.controller()),
    enemyTarget: () => (source: GameObject, target: Character) => (source.controller() !== target.controller()),
    notSelf: () => (source: GameObject, target: Character) => (source.charOwner() !== target),
    isSelf: () => (source: GameObject, target: Character) => (source.charOwner() === target),
}

export default TargetRequirements