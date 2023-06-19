import { Content, P5 } from "../types";
import { Node } from "./Node";

class Transfer {
  private x: number;
  private y: number;
  private distX: number = 0;
  private distY: number = 0;
  private ridePct: number = 0.0;
  private finished: boolean = false;
  private step: number = 0.02;
  private radii: number = 5;

  constructor(
    private sketch: P5,
    private from: Node,
    private to: Node,
    private message: Content,
  ) {

    this.x = from.x;
    this.y = from.y;
    this.updateDistance();
  }

  public draw() {
    this.ridePct += this.step;
    this.sketch.fill(255);
    this.sketch.ellipse(this.x, this.y, this.radii * 2, this.radii * 2);
  }

  public afterDraw() {
    if (this.ridePct >= 1.0) {
      this.finished = true;
      // this.from.transferDelivered(this);
      // this.to.trasnferArrived(this);
    }
  }

  public update() {
    this.updateDistance();
    const ridePct = this.ridePct;
    if (ridePct < 1.0) {
      this.x = this.from.x + (ridePct * this.distX);
      this.y = this.from.y + (ridePct * this.distY);
    }
  }
  
  public isFinished(): boolean {
    return this.finished;
  }

  private updateDistance() {
    this.distX = this.to.x - this.from.x;
    this.distY = this.to.y - this.from.y;
  }
}

export {
  Transfer,
}