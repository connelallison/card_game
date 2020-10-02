import { Component } from 'react'
import { Selections } from './TargetableEntity'

export interface EntityContainerProps {
    mine: boolean
    contents: any[]
    selections: Selections
}

abstract class EntityContainer extends Component {
    props!: EntityContainerProps

    constructor(props: EntityContainerProps) {
        super(props)
    }

    abstract render(): JSX.Element
}

export default EntityContainer