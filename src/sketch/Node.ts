import { P5 } from "../types";

const defaultColor = '#ff0000';
const defaultRadii = 10;
const labelHeight = 15;

export abstract class Node {

  protected sketch: P5;
  protected _x: number;
  protected _y: number;
  protected _id: string;
  protected _radii: number;
  protected _label: string;
  protected _color: string;
  protected _incoming: Node[];
  protected _outgoing: Node[];

  constructor(
    sketch: P5, 
    id: string,
    x?: number, 
    y?: number,
    radii?: number,
    label?: string,
    color?: string,
  ) {
    this.sketch = sketch;
    this._id = id;
    this._x = x || 0;
    this._y = y || 0;
    this._radii = radii || defaultRadii;
    this._label = label || id;
    this._color = color || defaultColor;
    this._incoming = [];
    this._outgoing = [];
  }

  public abstract draw(): void;
  public abstract mouseClicked(): void;
  public abstract mouseDragged(): void;

  public isBelow(x: number, y: number): boolean {
    const closest = this.radii;
    const d = this.sketch.dist(x, y, this.x, this.y);
    return d < closest;
  }

  public update(x: number, y: number): void {
    this._x = x;
    this._y = y;
  }

  public drawLabel() {
    if (this.label) {
      this.sketch.fill(0);
      this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
      this.sketch.textStyle(this.sketch.NORMAL);
      this.sketch.text(this.label, this.x, this.y + this.radii + labelHeight);
    }
  }

  public connectWith(node: Node) {
    if (!this._incoming) {
      this._incoming = [];
    }
    this._incoming.push(node);
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

  get label(): string {
    return this._label;
  }
  
  get radii(): number {
    return this._radii;
  }

  get incoming(): Node[] {
    return this._incoming;
  }
}