import React, { Component, Fragment } from 'react';
import CardCanvas from "../components/CardCanvas.js";

class MainCanvas extends Component {

  componentDidMount() {
      const canvas = this.refs.mainCanvas;
      const context = canvas.getContext("2d");
      // context.drawImage(<CardCanvas/>, 200, 200)
      // const cardCanvas = <canvas id="cardID" ref="cardID" width={window.innerWidth*0.1} height={window.innerHeight*0.1}></canvas>;
      const cardCanvas = document.createElement('canvas');
      cardCanvas.id = "cardID";
      context.drawImage(cardCanvas, 0, 0)
      // const img = this.refs.image
    }

  render(){
    return (
      <div>
        <canvas id="mainCanvas" ref="mainCanvas" width={window.innerWidth*0.8} height={window.innerHeight*0.8}></canvas>
      </div>
    );
  }
}

export default MainCanvas;
