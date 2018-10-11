import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const TYPE = 'Rectangle';
const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps(rect, oldProps, newProps) {
    const { color, x, y, width, height } = newProps;
    rect.clear();
    rect.beginFill(color, 1);
  
    rect.drawRect(x, y, width, height);
    rect.endFill();
  }
}

export const Rectangle = CustomPIXIComponent(behavior, TYPE);