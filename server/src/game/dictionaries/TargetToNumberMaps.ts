const TargetToNumberMaps = {
    count: (target: GameObject) => 1,
    attack: (target: Character | WeaponCreation) => target.attack,
    health: (target: Character) => target.health,
    missingHealth: (target: Character) => target.missingHealth(),
    maxHealth: (target: Character) => target.maxHealth(),
    cost: (target: Card) => target.cost,
    fervour: (target: PersistentCard) => target.stats.fervour,
    charges: (target: Creation | NamelessFollower) => target.charges,
    ownerIncome: (target: GameObject) => target.controller().stats.income,
    ownerGrowth: (target: GameObject) => target.controller().stats.growth,
    ownerFervour: (target: GameObject) => target.controller().stats.fervour,
    ownerMoney: (target: GameObject) => target.controller().money,
}

export default TargetToNumberMaps

import GameObject from "../gameObjects/GameObject"
import Character from "../gameObjects/Character"
import WeaponCreation from "../gameObjects/WeaponCreation"
import Card from "../gameObjects/Card"
import PersistentCard from "../gameObjects/PersistentCard"
import NamelessFollower from "../gameObjects/NamelessFollower"
import Creation from "../gameObjects/Creation"
import Follower from "../gameObjects/Follower"

