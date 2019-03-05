import React, { Component, Fragment } from 'react';

class CardCanvas extends Component {

  componentDidMount() {
      const canvas = this.refs.cardID;
      const context = canvas.getContext("2d");
      // context = context.drawImage
      // const img = this.refs.image
    }

  render(){
    return (
        <canvas id="cardID" ref="cardID" width={window.innerWidth*0.1} height={window.innerHeight*0.1}></canvas>
    );
  }
}

export default CardCanvas;
