const TargetToStringMaps = {
    classID: (target: GameObject) => target.id,
    name: (target: GameObject) => target.name,
}

export default TargetToStringMaps

import GameObject from "../gameObjects/GameObject"