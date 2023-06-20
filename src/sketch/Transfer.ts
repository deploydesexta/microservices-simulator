import { Content, P5 } from "../types";
import { Node } from "./Node";

class Transfer {
  private x: number;
  private y: number;
  private distX: number = 0;
  private distY: number = 0;
  private ridePct: number = 0.0;
  private step: number = 0.02;
  private radii: number = 7;
  private _content: Content;

  constructor(
    private sketch: P5,
    private from: Node,
    private to: Node,
    content: Content,
  ) {
    this.x = from.middleX;
    this.y = from.middleY;
    this._content = content;
    this.updateDistance();
  }

  public draw() {
    this.sketch.fill(255, 0, 0);
    this.sketch.ellipse(this.x, this.y, this.radii * 2, this.radii * 2);
  }

  public notify() {
    this.from.transferDelivered(this);
    this.to.trasnferArrived(this);
  }

  public content(): Content {
    return this._content;
  }
  
  public update() {
    this.updateDistance();
    this.updateRidePct();

    if (this.ridePct <= 1.0) {
      this.x = this.from.middleX + (this.ridePct * this.distX);
      this.y = this.from.middleY + (this.ridePct * this.distY);
    }
  }
  
  public isFinished(): boolean {
    return this.ridePct >= 1.0;
  }

  private updateRidePct() {
    this.ridePct += this.step;
  }

  private updateDistance() {
    this.distX = this.to.middleX - this.from.middleX;
    this.distY = this.to.middleY - this.from.middleY;
  }
}

export {
  Transfer,
}