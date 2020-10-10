import React from 'react'
import Creation from './Creation'
import EntityContainer from './EntityContainer'

class CreationZone extends EntityContainer {
  render() {
    let creationList
    if (this.props.contents.length > 0) {
      creationList = this.props.contents.map((creation) => 
        <Creation big={false} hover={false} object={creation} selections={this.props.selections} />
      )
    } else {
      creationList = [
        <p className='emptyZone'>No creations in play.</p>,
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