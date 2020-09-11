import { DynamicNumberObject, DynamicTargetObject } from "../structs/DynamicValueObject";

export const countFriendlyFollowers: DynamicNumberObject = {
    'valueType': 'number',
    'from': 'numbers',
    'reducer': 'count',
    'numbers': {
        'valueType': 'numbers',
        'from': 'targets',
        'numberMap': 'count',
        'targets': {
            'valueType': 'targets',
            'from': 'targetDomain',
            'targetDomain': 'friendlyBoard'
        },
    }
}

export const sumFriendlyFollowersHealth: DynamicNumberObject = {
    'valueType': 'number',
    'from': 'numbers',
    'reducer': 'sum',
    'numbers': {
        'valueType': 'numbers',
        'from': 'targets',
        'numberMap': 'health',
        'targets': {
            'valueType': 'targets',
            'from': 'targetDomain',
            'targetDomain': ['friendlyBoard']
        }
    }
}

export const lastEnemyFollowerEnteredPlay: DynamicTargetObject = {
    valueType: 'target',
    from: 'targets',
    reducer: 'last',
    targets: {
        valueType: 'targets',
        from: 'events',
        targetMap: 'enterPlayEventPlayedCard',
        requirements: [{
            targetRequirement: 'isEnemy'
        },
        {
            targetRequirement: 'isType',
            values: {
                type: 'Follower'
            }
        },
        {
            targetRequirement: 'inZone',
            values: {
                zone: 'board'
            }
        }],
        events: {
            valueType: 'events',
            from: 'eventDomain',
            eventDomain: 'enterPlayEvents'
        }
    }
}

export const lastFriendlyFollowerDied: DynamicTargetObject = {
    valueType: 'target',
    from: 'targets',
    reducer: 'last',
    targets: {
        valueType: 'targets',
        from: 'events',
        targetMap: 'deathEventDestroyedTarget',
        requirements: [{
            targetRequirement: 'isFriendly',
        }, {
            targetRequirement: 'isType',
            values: {
                type: 'Follower',
            },
        }],
        events: {
            valueType: 'events',
            from: 'eventDomain',
            eventDomain: 'deathEvents',
        }
    }
}