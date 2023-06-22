import { Image } from "p5";
import { Content, P5 } from "../types";
import { Node } from "./Node";
import { Producer } from "./Producer";
import { Stage } from "./Stage";
import { Transfer } from "./Transfer";

abstract class Database extends Node implements Producer {
  abstract produce(to: Node, message: { [key: string]: any; }): void;
  abstract updateProps(label: string): void;
}

class RDBMS extends Database {

  private stage: Stage;
  private image: Image;
  private _height: number;
  private _width: number;
  private _label: string;
  private _ops: number;

  constructor(
    sketch: P5, 
    stage: Stage,
    id: string, 
    x: number, 
    y: number,
    label?: string
  ) {
    super(sketch, id, x, y);
    this.stage = stage;
    this.image = sketch.images.database;
    this._width = this.image.width / 2;
    this._height = this.image.height / 2;
    this._label = label || id;
    this._ops = 0;

    setInterval(() => {
      if (this._ops > 0) {
        this._ops -= 1;
      }
    }, 1_000);
  }

  public draw() {
    this.sketch.image(this.image, this.x, this.y, this._width, this._height);
    this.drawLabel();
    if (this._ops >= 5) {
      this.sketch.image(this.sketch.images.fire, this.x, this.y, this._width, this._height);
    }
  }

  public mouseClicked(): void {
    this.sketch.editNode?.(this);
  }

  public mouseDragged(): void {
    // middle of the image
    const x = this.sketch.mouseX - (this._width / 2);
    const y = this.sketch.mouseY - (this._height / 2);
    this.update(x, y);
  }

  public transferArrived(transfer: Transfer): void {
    this._ops += 1;
  }
  
  public transferDelivered(transfer: Transfer): void {

  }

  public width(): number {
    return this._width;
  }
  
  public height(): number {
    return this._height;
  }
  
  public label(): string {
    return this._label;
  }

  public produce(to: Node, message: Content): void {
    this.stage.push(new Transfer(this.sketch, this, to, message));
  }

  public updateProps(label: string): void {
    this._label = label;
  }
}

export {
  Database,
  RDBMS
};

