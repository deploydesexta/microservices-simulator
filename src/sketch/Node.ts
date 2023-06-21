import { P5 } from "../types";
import { Transfer } from "./Transfer";

const labelHeight = 15;

export abstract class Node {

  protected sketch: P5;
  protected _x: number;
  protected _y: number;
  protected _id: string;
  protected _incoming: Node[];
  protected _outgoing: Node[];

  constructor(
    sketch: P5, 
    id: string,
    x: number, 
    y: number,
  ) {
    this.sketch = sketch;
    this._id = id;
    this._x = x;
    this._y = y;
    this._incoming = [];
    this._outgoing = [];
  }

  public abstract draw(): void;
  public abstract mouseClicked(): void;
  public abstract mouseDragged(): void;
  public abstract width(): number;
  public abstract height(): number;
  public abstract label(): string;
  public abstract transferArrived(transfer: Transfer): void;
  public abstract transferDelivered(transfer: Transfer): void;

  public isBelow(x: number, y: number): boolean {
    const insideWidth = x > this.x && x < this.x + this.width();
    const insideHeight = y > this.y && y < this.y + this.height();
    return insideWidth && insideHeight;
  }

  public update(x: number, y: number): void {
    this._x = x;
    this._y = y;
  }

  public drawLabel() {
    const label = this.label();
    if (label) {
      this.sketch.fill(0);
      this.sketch.strokeWeight(0.1);
      this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
      this.sketch.textSize(18);
      this.sketch.text(label, this.x + (this.width() / 2), this.y + this.height() + labelHeight);
    }
  }

  public connectWith(node: Node) {
    if (!this._outgoing) {
      this._outgoing = [];
    }
    this._outgoing.push(node);
  }

  public connectedWith(node: Node) {
    if (!this._incoming) {
      this._incoming = [];
    }
    this._incoming.push(node);
  }

  get middleX (): number {
    return this._x + (this.width() / 2);
  }

  get middleY (): number {
    return this._y + (this.height() / 2);
  }

  get x (): number {
    return this._x;
  }

  get y (): number {
    return this._y;
  }

  get id(): string {
    return this._id;
  }

  get incoming(): Node[] {
    return this._incoming;
  }

  get outgoing(): Node[] {
    return this._outgoing;
  }
}