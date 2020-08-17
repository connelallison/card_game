import React, { Component } from 'react'
import Creation from './Creation.js'

class CreationZone extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let creationList
    if (this.props.creations.length > 0) {
      creationList = this.props.creations.map((creation) => 
        <Creation object={creation} selected={this.props.selected} interactivity={this.props.interactivity} />
      )
    } else {
      creationList = [
        <p>No creations in play.</p>,
      ]
    }

    return (
      <div className="creationZone">
        <div className='cardList creationList'>
          {creationList}
        </div>
      </div>
    )
  }
}

export default CreationZone