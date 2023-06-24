import { uniqueId } from "@/utils/id";
import { P5 } from "@/types";
import { Colors } from "./Constants";
import { Node } from "./Node";

const defaultColor = Colors.black;

class Edge {
  
  constructor(
    public from: Node,
    public to: Node,
    public id: string = uniqueId(),
    public color: string = defaultColor,
  ) {}

  public draw(sketch: P5) {
    sketch.stroke(this.color);
    sketch.strokeWeight(3);
    sketch.line(this.from.middleX, this.from.middleY, this.to.middleX, this.to.middleY);
    this.drawArrowHead(sketch);
  }

  private drawArrowHead(sketch: P5): void {
    const natualOrder = true;
    const distance = 0.5;
    const size = 22;

    if (natualOrder) {
      const x0 = this.from.middleX;
      const y0 = this.from.middleY;
      const x1 = sketch.lerp(this.from.middleX, this.to.middleX, distance);
      const y1 = sketch.lerp(this.from.middleY, this.to.middleY, distance);
      sketch.arrowHead(x1, y1, size, sketch.atan2(y0 - y1, x0 - x1), sketch.radians(30), false);
    } else {
      const x0 = sketch.lerp(this.from.middleX, this.to.middleX, distance);
      const y0 = sketch.lerp(this.from.middleY, this.to.middleY, distance);
      const x1 = this.to.middleX;
      const y1 = this.to.middleY;
      sketch.arrowHead(x0, y0, size, sketch.atan2(y1 - y0, x1 - x0), sketch.radians(30), false);
    }
  }
}

export {
  Edge,
}