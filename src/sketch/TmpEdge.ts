import { P5 } from "../types";
import { Colors } from "./Constants";
import { Node } from "./Node";

const defaultColor = Colors.red;

class TmpEdge {
  
  constructor(
    public readonly sketch: P5,
    public from: Node,
    public toX: number,
    public toY: number,
    public color: string = defaultColor,
  ) {}

  public draw() {
    this.sketch.stroke(this.color);
    this.sketch.strokeWeight(1);
    this.sketch.line(this.from.x, this.from.y, this.toX, this.toY);
  }

  public mouseDragged(): void {
    this.toX = this.sketch.mouseX;
    this.toY = this.sketch.mouseY;
  }
}

export {
  TmpEdge,
}