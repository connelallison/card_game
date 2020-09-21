const TargetToNumberMaps = {
    count: (target: GameObject) => 1,
    attack: (target: Character | WeaponCreation) => target.attack,
    health: (target: Character) => target.health,
    cost: (target: Card) => target.cost,
}

export default TargetToNumberMaps

import GameObject from "../gameObjects/GameObject"
import Character from "../gameObjects/Character"
import WeaponCreation from "../gameObjects/WeaponCreation"
import Card from "../gameObjects/Card"