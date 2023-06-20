import { P5 } from "../types";
import { Colors } from "./Constants";
import { Node } from "./Node";

const defaultColor = Colors.black;

class Edge {
  
  constructor(
    public readonly sketch: P5,
    public from: Node,
    public to: Node,
    public color: string = defaultColor,
  ) {}

  public draw() {
    this.sketch.stroke(this.color);
    this.sketch.strokeWeight(3);
    this.sketch.line(this.from.middleX, this.from.middleY, this.to.middleX, this.to.middleY);
    this.drawArrowHead();
  }

  private drawArrowHead(): void {
    const natualOrder = true;
    const distance = 0.5;
    const size = 22;

    if (natualOrder) {
      const x0 = this.from.middleX;
      const y0 = this.from.middleY;
      const x1 = this.sketch.lerp(this.from.middleX, this.to.middleX, distance);
      const y1 = this.sketch.lerp(this.from.middleY, this.to.middleY, distance);
      this.sketch.arrowHead(x1, y1, size, this.sketch.atan2(y0 - y1, x0 - x1), this.sketch.radians(30), false);
    } else {
      const x0 = this.sketch.lerp(this.from.middleX, this.to.middleX, distance);
      const y0 = this.sketch.lerp(this.from.middleY, this.to.middleY, distance);
      const x1 = this.to.middleX;
      const y1 = this.to.middleY;
      this.sketch.arrowHead(x0, y0, size, this.sketch.atan2(y1 - y0, x1 - x0), this.sketch.radians(30), false);
    }
  }
}

export {
  Edge,
}