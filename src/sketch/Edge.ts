import { P5 } from "../types";
import { Colors } from "./Constants";
import { Node } from "./Node";

class Edge {
  
  private static defaultColor = Colors.red;

  constructor(
    public readonly sketch: P5,
    public from: Node,
    public to: Node,
    public color: string = Edge.defaultColor,
  ) {}

  public draw() {
    this.sketch.stroke(this.color);
    this.sketch.strokeWeight(3);
    this.sketch.line(this.from.x, this.from.y, this.to.x, this.to.y);
  }
}

export {
  Edge,
}