import React, { Component } from 'react'

class PlayArea extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleClick = this.handleClick.bind(this)
      this.canBeTargeted = this.canBeTargeted.bind(this);
    }
  
    canBeTargeted() {
      // console.log(this.props)
      return this.props.selected !== null && this.props.selected.validTargets === null
      // return this.props.selected !== null && this.props.selected !== this.props.object
    }
  
    handleClick() {
      if (this.canBeTargeted()) {
        this.props.interactivity.chooseTarget(null)
      } else {
        // this.props.interactivity.invalidMove()
      }
    }
  
    render() {
      const outlineStatus = this.canBeTargeted() ? "canBeTargeted" : ""
      const styleClasses = outlineStatus + " playarea"
      return (
        <div onClick={this.handleClick} className={styleClasses}>
            {this.props.children}
        </div>
      )
    }
  
  }
  
  export default PlayArea
  