import React, { Component } from 'react';
import { Container, Sprite, Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import carImg from './img/car.svg';

const DIMENSIONS = {
  width: window.innerWidth,
  height: window.innerHeight
};

const OPTIONS = {
  backgroundColor: 0x000000
};

export class Game extends Component {
  state = {
    x: DIMENSIONS.width / 2,
    y: DIMENSIONS.height / 2
  };

  componentWillMount() {
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 37) {
        this.setState(prevState => ({ x: prevState.x - 20}))
      }

      if(e.keyCode === 38) {
        this.setState(prevState => ({ y: prevState.y - 20}))
      }

      if(e.keyCode === 39) {
        this.setState(prevState => ({ x: prevState.x + 20}))
      }

      if(e.keyCode === 40) {
        this.setState(prevState => ({ y: prevState.y + 20}))
      }
    })
  }

  render() {
    const { height, width } = DIMENSIONS;

    const centerAnchor = new PIXI.Point(0.5, 0.5);

    return (
      <Stage width={width} height={height} options={OPTIONS}>
        <Sprite
            anchor={centerAnchor}
            texture={PIXI.Texture.fromImage(carImg)}
            position={new PIXI.Point(this.state.x, this.state.y)}
        />
      </Stage>
    );
  }
}