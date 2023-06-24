import { Content, P5 } from "@/types";
import { Node } from "./Node";

class Transfer {
  public x: number;
  public y: number;
  public from: Node;
  public to: Node;
  public distX: number = 0;
  public distY: number = 0;
  public progress: number = 0.0;
  public step: number = 0.02;
  public radii: number = 7;
  public content: Content;

  constructor(from: Node, to: Node, content: Content) {
    this.x = from.middleX;
    this.y = from.middleY;
    this.from = from;
    this.to = to;
    this.content = content;
    this.updateDistance();
  }

  public draw(sketch: P5) {
    sketch.fill(255, 0, 0);
    sketch.ellipse(this.x, this.y, this.radii * 2, this.radii * 2);
  }

  public notify() {
    this.from.transferDelivered(this);
    this.to.transferArrived(this);
  }

  public update() {
    this.updateDistance();
    this.updateProgress();

    if (this.progress <= 1.0) {
      this.x = this.from.middleX + (this.progress * this.distX);
      this.y = this.from.middleY + (this.progress * this.distY);
    }
  }
  
  public isFinished(): boolean {
    return this.progress >= 1.0;
  }

  private updateProgress() {
    this.progress += this.step;
  }

  private updateDistance() {
    this.distX = this.to.middleX - this.from.middleX;
    this.distY = this.to.middleY - this.from.middleY;
  }
}

export {
  Transfer
};
