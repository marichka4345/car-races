import React, { Component } from 'react';
import { Container, Sprite, Stage } from 'react-pixi-fiber';
import * as PIXI from "pixi.js"
import Animated from 'animated';
import { Line } from '../../../shared/Line';
import carImg from './img/car.svg';
import flagImg from './img/flag.svg';
import styles from './Loader.scss'

const DIMENSIONS = {
  width: window.innerWidth,
  height: window.innerHeight
};

const OPTIONS = {
  backgroundColor: 0x000000
};

const AnimatedSprite = Animated.createAnimatedComponent(Sprite);

export class Loader extends Component {
  state = {
    translate: new Animated.Value(0)
  };

  componentDidMount() {
    this.move();
  }

  move = () => {
    Animated.sequence([
      Animated.timing(this.state.translate, { toValue: 1, duration: 1000, delay: 300 }),
      Animated.timing(this.state.translate, { toValue: 0, duration: 500 })
    ]).start(() => this.move());
  };
  
  render() {
    const { height, width } = DIMENSIONS;
    const centerAnchor = new PIXI.Point(0.5, 0.5);

    const translate = this.state.translate.interpolate({
      inputRange: [0, 1],
      outputRange: [width / 2 - 100, width / 2 + 100]
    });

    return (
      <Stage width={width} height={height} options={OPTIONS}>
        <Container width={300} height={150}>
          <AnimatedSprite
            anchor={centerAnchor}
            texture={PIXI.Texture.fromImage(carImg)}
            position={new PIXI.Point(translate, height / 2 + 20)}
            x={translate}
          />
          <Sprite
            anchor={centerAnchor}
            texture={PIXI.Texture.fromImage(flagImg)}
            position={new PIXI.Point(width / 1.5, height / 2)}
          />
          <Line color="0xffffff" x={width/2} y={height/2 + 40} x1={0} y1={0} x2={280} y2={0} />
        </Container>
      </Stage>
    );
  }
}