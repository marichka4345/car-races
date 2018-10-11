import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const TYPE = 'Trees';
const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps(line, oldProps, newProps) {
    const { color, x, y, x1, y1, x2, y2 } = newProps;
    new Array(Math.ceil(DIMENSIONS.height / 200)).map((el, index) => (
      <Sprite
          anchor={centerAnchor}
          texture={PIXI.Texture.fromImage(this.getTree(index))}
          position={new PIXI.Point((DIMENSIONS.width - ROAD_WIDTH) / 2 - 50, 200 * (index + 1))}
      />)
    );
  }
}

export const Trees = CustomPIXIComponent(behavior, TYPE);