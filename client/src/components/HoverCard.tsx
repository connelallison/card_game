import React from 'react'
import Creation from './Creation'
import Follower from './Follower'
import Leader from './Leader'
import LeaderTechnique from './LeaderTechnique'
import Moment from './Moment'
import Passive from './Passive'
import Unknown from './Unknown'

const HoverCard = (props: {object: any, selections: any}) => {
    if (props.object.type === 'unknown') {
        return <Unknown relatedCard hover object={props.object} selections={props.selections} />
    } else if (props.object.type === 'Follower') {
        return <Follower relatedCard hover object={props.object} selections={props.selections} />
    } else if (props.object.type === 'Moment') {
        return <Moment relatedCard hover object={props.object} selections={props.selections} />
    } else if (props.object.type === 'Creation') {
        return <Creation relatedCard hover object={props.object} selections={props.selections} />
    } else if (props.object.type === 'Passive') {
        return <Passive relatedCard hover object={props.object} selections={props.selections} />
    } else if (props.object.type === 'Leader') {
        return <Leader relatedCard hover object={props.object} selections={props.selections} />
    } else if (props.object.type === 'LeaderTechnique') {
        return <LeaderTechnique relatedCard hover object={props.object} selections={props.selections} />
    } else return null
}

export default HoverCard