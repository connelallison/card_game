import React from 'react'
import { dummyAnimations, dummySelections } from '../structs/Dummies'
import Creation from './Creation'
import Follower from './Follower'
import Leader from './Leader'
import LeaderTechnique from './LeaderTechnique'
import Moment from './Moment'
import Passive from './Passive'
import Unknown from './Unknown'

const HoverCard = (props: { object: any, selections: any, animations: any }) => {
    if (!props.object) return null
    if (props.object.type === 'unknown') {
        return <Unknown relatedCard hover object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Follower') {
        return <Follower relatedCard hover object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Moment') {
        return <Moment relatedCard hover object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Creation') {
        return <Creation relatedCard hover object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Passive') {
        return <Passive relatedCard hover object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Leader') {
        return <Leader relatedCard hover object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'LeaderTechnique') {
        return <LeaderTechnique relatedCard hover object={props.object} animations={props.animations} selections={props.selections} />
    } else return null
}

export default HoverCard

export const PlayCard = (props: { object: any }) => {
    if (!props.object) return null
    const selections = dummySelections
    const animations = dummyAnimations
    if (props.object.type === 'unknown') {
        return <Unknown big playCard object={props.object} animations={animations} selections={selections} />
    } else if (props.object.type === 'Follower') {
        return <Follower big playCard object={props.object} animations={animations} selections={selections} />
    } else if (props.object.type === 'Moment') {
        return <Moment big playCard object={props.object} animations={animations} selections={selections} />
    } else if (props.object.type === 'Creation') {
        return <Creation big playCard object={props.object} animations={animations} selections={selections} />
    } else if (props.object.type === 'Passive') {
        return <Passive big playCard object={props.object} animations={animations} selections={selections} />
    } else if (props.object.type === 'Leader') {
        return <Leader big playCard object={props.object} animations={animations} selections={selections} />
    } else if (props.object.type === 'LeaderTechnique') {
        return <LeaderTechnique big playCard object={props.object} animations={animations} selections={selections} />
    } else return null
}

export const BigCard = (props: { mulligan?: boolean, object: any, selections: any, animations: any }) => {
    if (!props.object) return null
    if (props.object.type === 'unknown') {
        return <Unknown big mulligan={!!props.mulligan} object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Follower') {
        return <Follower big mulligan={!!props.mulligan} object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Moment') {
        return <Moment big mulligan={!!props.mulligan} object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Creation') {
        return <Creation big mulligan={!!props.mulligan} object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Passive') {
        return <Passive big mulligan={!!props.mulligan} object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'Leader') {
        return <Leader big mulligan={!!props.mulligan} object={props.object} animations={props.animations} selections={props.selections} />
    } else if (props.object.type === 'LeaderTechnique') {
        return <LeaderTechnique big mulligan={!!props.mulligan} object={props.object} animations={props.animations} selections={props.selections} />
    } else return null
}