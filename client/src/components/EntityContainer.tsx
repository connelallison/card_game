import { Component } from 'react'
import { TargetSelection } from './TargetableEntity'

export interface EntityContainerProps {
    mine: boolean
    selected: any[]
    contents: any[]
    targetSelection: TargetSelection
    handleSelection: (object: any) => void
}

abstract class EntityContainer extends Component {
    props!: EntityContainerProps

    constructor(props: EntityContainerProps) {
        super(props)
    }

    abstract render(): JSX.Element
}

export default EntityContainer