import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const TYPE = 'Line';
const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps(line, oldProps, newProps) {
    const { color, x, y, x1, y1, x2, y2 } = newProps;
    line.clear();
    line.lineStyle(1, color, 0.5);
  
    // Define line position - this aligns the top left corner of our canvas
    line.position.x = x;
    line.position.y = y;
      
    // Define pivot to the center of the element (think transformOrigin)
    line.pivot.set((x2 - x1) / 2, 0);

    // Draw line
    line.moveTo(x1, y1);
    line.lineTo(x2, y2);
  }
}

export const Line = CustomPIXIComponent(behavior, TYPE);