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

export class Game extends Component {
  state = {
    stageY: 0,
    carX: INITIAL_CAR_X,
    carY: DIMENSIONS.height / 2,
    roadY: 0
  };

  componentWillMount() {
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 37) {
        if (this.state.carX === INITIAL_CAR_X - CAR_WIDTH) {
          return;
        }

        this.setState(prevState => ({ carX: prevState.carX - CAR_WIDTH }))
      }

      if(e.keyCode === 38) {
        this.setState(prevState => ({
          stageY: prevState.stageY + 20,
          carY: prevState.carY - 20,
          roadY: prevState.roadY - 20
        }))
      }

      if(e.keyCode === 39) {
        if (this.state.carX === INITIAL_CAR_X + CAR_WIDTH) {
          return;
        }

        this.setState(prevState => ({ carX: prevState.carX + CAR_WIDTH }))
      }

      if(e.keyCode === 40) {
        this.setState(prevState => ({
          stageY: prevState.stageY - 20,
          carY: prevState.carY + 20,
          roadY: prevState.roadY + 20
        }))
      }
    })
  }

  getTree = (index) => index % 2 ? tree1Img : tree2Img;

  getTrees = () => {
    const trees = [];
    const treesCount = Math.ceil(DIMENSIONS.height / 200);
    const centerAnchor = new PIXI.Point(0.5, 0.5);

    for (let i = 0; i < treesCount; i++) {
      trees.push(
        <Sprite
          anchor={centerAnchor}
          texture={PIXI.Texture.fromImage(this.getTree(i))}
          position={new PIXI.Point((DIMENSIONS.width - ROAD_WIDTH) / 2 - 50, 200 * (i + 1))}
        />
      );
    }

    return trees;
  }

  render() {
    const { height, width } = DIMENSIONS;

    const centerAnchor = new PIXI.Point(0.5, 0.5);

    return (
      <Stage width={width} height={height} position={new PIXI.Point(0, this.state.stageY)}>
        <Rectangle color={0x260c01} width={ROAD_WIDTH} height={height} x={(width - ROAD_WIDTH) / 2} y={this.state.roadY}>
          <Sprite
              anchor={centerAnchor}
              texture={PIXI.Texture.fromImage(carImg)}
              position={new PIXI.Point(this.state.carX,  this.state.carY)}
          />
        </Rectangle>

        <Rectangle color={0x55AE3A} width={GREEN_AREA_WIDTH} height={height} x={0} y={this.state.roadY}>
          { this.getTrees() }
        </Rectangle>

        <Rectangle color={0x55AE3A} width={GREEN_AREA_WIDTH} height={height} x={GREEN_AREA_WIDTH + ROAD_WIDTH} y={this.state.roadY}>
          { this.getTrees() }
        </Rectangle>
      </Stage>
    );
  }
}