import { P5 } from "../types";
import { Node } from "./Node";

abstract class Circle extends Node {

}

class StaticCircle extends Circle {
  
  public draw() {
    this.sketch.ellipse(this.x, this.y, 50, 50);
    this.drawLabel();
  }

  public mouseClicked(): void {
    this.sketch.editNode?.(this);
  }

  public mouseDragged(): void {
    this.update(this.sketch.mouseX, this.sketch.mouseY)
  }
  
  public updateProps(label: string): void {
    this._label = label;
  }
}

export type {
  Circle,
}

export {
  StaticCircle,
}