import { P5 } from "@/types";
import { Transfer } from "./Transfer";
import { Payload } from "@/sketch/StateManager";

const labelHeight = 15;

export abstract class Node {

  public id: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public incoming: Node[];
  public outgoing: Node[];

  constructor(id: string, x: number, y: number, width: number, height: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.incoming = [];
    this.outgoing = [];
  }

  public abstract draw(sketch: P5): void;
  public abstract transferArrived(transfer: Transfer): void;
  public abstract transferDelivered(transfer: Transfer): void;
  public abstract updateState(payload: Payload): void

  public isBelow(x: number, y: number): boolean {
    const insideWidth = x > this.x && x < this.x + this.width;
    const insideHeight = y > this.y && y < this.y + this.height;
    return insideWidth && insideHeight;
  }

  public drawLabel(sketch: P5, label: string) {
    sketch.fill(0);
    sketch.strokeWeight(0.1);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textSize(16);
    sketch.text(label, this.x + (this.width / 2), this.y + this.height + labelHeight);
  }

  public loadImage(sketch: P5, path: string) {
    const cached = sketch.images[path];
    if (cached) {
      return cached;
    }
    const image = sketch.loadImage(path);
    sketch.images[path] = image;
    return image;
  }

  public connectWith(node: Node) {
    if (!this.outgoing) {
      this.outgoing = [];
    }
    this.outgoing.push(node);
  }

  public connectedWith(node: Node) {
    if (!this.incoming) {
      this.incoming = [];
    }
    this.incoming.push(node);
  }

  public disconnect(node: Node) {
    this.outgoing = this.outgoing.filter(n => n.id !== node.id);
    this.incoming = this.incoming.filter(n => n.id !== node.id);
  }
  
  get middleX (): number {
    return this.x + (this.width / 2);
  }

  get middleY (): number {
    return this.y + (this.height / 2);
  }
}