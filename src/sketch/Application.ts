import { Content, P5 } from "../types";
import { Node } from "./Node";
import { Producer } from "./Producer";
import { Stage } from "./Stage";
import { Transfer } from "./Transfer";

const defaultColor = '#ff0000';
const defaultSize = 50;
const defaultRadii = defaultSize / 2;

abstract class Application extends Node implements Producer {
  
  abstract produce(to: Node, message: { [key: string]: any; }): void;
  abstract updateProps(label: string): void;
}

class Microservice extends Application {

  private stage: Stage;

  constructor(
    sketch: P5, 
    stage: Stage,
    id: string, 
    x: number, 
    y: number,
    label?: string
  ) {
    super(sketch, id, x, y, defaultRadii, label, defaultColor);
    this.stage = stage;
  }

  public draw() {
    this.sketch.fill(this._color);
    this.sketch.ellipse(this.x, this.y, 50, 50);
    this.drawLabel();
  }

  public mouseClicked(): void {
    this.sketch.editNode?.(this);
  }

  public mouseDragged(): void {
    this.update(this.sketch.mouseX, this.sketch.mouseY)
  }
  
  public name(): string {
    return this._label || '';
  }

  public produce(to: Node, message: Content): void {
    this.stage.push(new Transfer(this.sketch, this, to, message));
  }

  public updateProps(label: string): void {
    this._label = label;
  }
}

export {
  Application,
  Microservice,
}