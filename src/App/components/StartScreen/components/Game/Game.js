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

const CAR_WIDTH = 100;
const ROAD_WIDTH = CAR_WIDTH * 3;
const GREEN_AREA_WIDTH = (DIMENSIONS.width - ROAD_WIDTH) / 2;

const INITIAL_CAR_X = DIMENSIONS.width / 2;

const centerAnchor = new PIXI.Point(0.5, 0.5);

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
    const { carX } = this.state;

    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case 37:
          if (carX === INITIAL_CAR_X - CAR_WIDTH) {
            return;
          }

          this.setState(prevState => ({ carX: prevState.carX - CAR_WIDTH }));
          break;

        case 38:
          this.setState(prevState => ({
            stageY: prevState.stageY + 20,
            carY: prevState.carY - 20,
            roadY: prevState.roadY - 20,
            distance: prevState.distance + 20,
            treesCount: prevState.distance + 20 % 100 ? prevState.treesCount + 1 : prevState.treesCount
          }));
          break;

        case 39:
          if (carX === INITIAL_CAR_X + CAR_WIDTH) {
            return;
          }

          this.setState(prevState => ({ carX: prevState.carX + CAR_WIDTH }));

        case 40:
          this.setState(prevState => ({
            stageY: prevState.stageY - 20,
            carY: prevState.carY + 20,
            roadY: prevState.roadY + 20,
            distance: prevState.distance - 20
          }));
          break;
        default: break;

      }
    })
  }

  getTree = (index) => index % 2 ? tree1Img : tree2Img;

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

    return (
      <Stage width={width} height={height} position={new PIXI.Point(0, 0)}>
        <Rectangle color={0x260c01} width={ROAD_WIDTH} height={height} x={(width - ROAD_WIDTH) / 2} y={0}>
          <Sprite
              anchor={centerAnchor}
              texture={PIXI.Texture.fromImage(carImg)}
              position={new PIXI.Point(this.state.carX, height / 2)}
          />
        </Rectangle>

        <Container x={0} y={this.state.stageY} ref={this.leftTreeContainer}>
          <Rectangle color={0x55AE3A} width={GREEN_AREA_WIDTH} height={height} y={this.state.roadY} />
          { this.getTrees(GREEN_AREA_WIDTH - 50, treesCount) }
        </Container>

        <Container x={GREEN_AREA_WIDTH + ROAD_WIDTH} y={this.state.stageY}>
          <Rectangle color={0x55AE3A} width={GREEN_AREA_WIDTH} height={height} y={this.state.roadY} />
          { this.getTrees(50, treesCount) }
        </Container>
      </Stage>
    );
  }
}