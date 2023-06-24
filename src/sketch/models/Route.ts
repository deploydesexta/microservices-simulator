import { P5 } from "@/types";
import { Colors } from "./Constants";
import { Node } from "./Node";

const defaultColor = Colors.red;

export class Route {
  
  constructor(
    public from: Node,
    public toX: number,
    public toY: number,
    public color: string = defaultColor,
  ) {}

  public draw(sketch: P5) {
    sketch.stroke(this.color);
    sketch.strokeWeight(2);
    sketch.line(this.from.middleX, this.from.middleY, this.toX, this.toY);
  }

  public update(x: number, y: number): void {
    this.toX = x;
    this.toY = y;
  }
}
