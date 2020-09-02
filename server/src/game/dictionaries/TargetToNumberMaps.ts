import GameObject from "../gameObjects/GameObject"
import DestroyableCard from "../gameObjects/DestroyableCard"
import Character from "../gameObjects/Character"
import WeaponCreation from "../gameObjects/WeaponCreation"

const TargetToNumberMaps = {
    count: (target: GameObject) => 1,
    attack: (target: Character | WeaponCreation) => target.attack,
    health: (target: DestroyableCard) => target.health
}

export default TargetToNumberMaps