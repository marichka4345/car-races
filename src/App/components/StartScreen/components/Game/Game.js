import React, { Component } from 'react';
import { Container, Sprite, Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { Rectangle } from '../../../../../shared/Rectangle';
import carImg from './img/car.svg';
import tree1Img from './img/tree1.svg';
import tree2Img from './img/tree2.svg';

const DIMENSIONS = {
  width: window.innerWidth,
  height: window.innerHeight
};

const COLORS = {
  grassColor: 0x55AE3A,
  roadColor: 0x260c01
};

const CAR_WIDTH = 100;
const ROAD_WIDTH = CAR_WIDTH * 3;
const GREEN_AREA_WIDTH = (DIMENSIONS.width - ROAD_WIDTH) / 2;

const INITIAL_CAR_X = DIMENSIONS.width / 2;

const centerAnchor = new PIXI.Point(0.5, 0.5);

const KEY_CODES = ['ArrowUp', 'ArrowRight', 'ArrowLeft'];
const keysPressed = {};

export class Game extends Component {
  state = {
    stageY: 0,
    carX: INITIAL_CAR_X,
    carY: DIMENSIONS.height / 2,
    roadY: 0,
    distance: 0,
    treesCount: Math.ceil(DIMENSIONS.height / 200)
  };

  leftTreeContainer = React.createRef();

  componentWillMount() {
    document.addEventListener('keydown', (e) => {
      const { code } = e;

      keysPressed[code] = true;

      if (keysPressed.ArrowUp && keysPressed.ArrowRight) {
        console.log('up & right');
        this.moveForward();
        this.moveRight();
        return;
      }

      if (keysPressed.ArrowUp && keysPressed.ArrowLeft) {
        console.log('up & left');
        this.moveForward();
        this.moveLeft();
        return;
      }

      if (code === 'ArrowUp') {
        this.moveForward();
      }

      if (code === 'ArrowDown') {
      }

      if (code === 'ArrowRight') {
        this.moveRight();
      }

      if (code === 'ArrowLeft') {
        this.moveLeft();
      }
    });

    document.addEventListener('keyup', ({ code }) => {
      if (KEY_CODES.includes(code)) {
        console.log('released ', code)
        keysPressed[code] = false;
      }
    });
  }

  moveForward() {
    this.setState(({ stageY, carY, roadY, distance, treesCount }) => ({
      stageY: stageY + 20,
      carY: carY - 20,
      roadY: roadY - 20,
      distance: distance + 20,
      treesCount: distance + 20 % 100 ? treesCount + 1 : treesCount
    }));
  }

  moveRight() {
    const { carX } = this.state;

    if (carX === INITIAL_CAR_X + CAR_WIDTH) {
      return;
    }

    this.setState(prevState => ({ carX: prevState.carX + CAR_WIDTH }));
  }

  moveLeft() {
    const { carX } = this.state;

    if (carX === INITIAL_CAR_X - CAR_WIDTH) {
      return;
    }

    this.setState(prevState => ({ carX: prevState.carX - CAR_WIDTH }));
  }

  getTree = index => index % 2 ? tree1Img : tree2Img;

  getTrees = (x, treesCount) => {
    const trees = [];
    for (let i = 0; i < treesCount; i++) {
      trees.push(
        <Sprite
          anchor={centerAnchor}
          texture={PIXI.Texture.fromImage(this.getTree(i))}
          position={new PIXI.Point(x, -200 * i + 50)}
        />
      );
    }

    return trees;
  }

  render() {
    const { height, width } = DIMENSIONS;

    const { treesCount } = this.state;

    const grass =
      <Rectangle color={COLORS.grassColor} width={GREEN_AREA_WIDTH} height={height} y={this.state.roadY} />;

    return (
      <Stage width={width} height={height} position={new PIXI.Point(0, 0)}>
        <Rectangle color={COLORS.roadColor} width={ROAD_WIDTH} height={height} x={(width - ROAD_WIDTH) / 2} y={0} />
        <Sprite
            anchor={centerAnchor}
            texture={PIXI.Texture.fromImage(carImg)}
            position={new PIXI.Point(this.state.carX, height / 2)}
        />

        <Container x={0} y={this.state.stageY} ref={this.leftTreeContainer}>
          { grass }
          { this.getTrees(GREEN_AREA_WIDTH - 50, treesCount) }
        </Container>

        <Container x={GREEN_AREA_WIDTH + ROAD_WIDTH} y={this.state.stageY}>
          { grass }
          { this.getTrees(50, treesCount) }
        </Container>
      </Stage>
    );
  }
}