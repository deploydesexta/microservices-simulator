import { P5 } from "@/types";
import { Node } from "./Node";
import { Transfer } from "./Transfer";
import { Payload, Producer } from "@/sketch/StateManager";

const scale = 3;
const defaultWidth = 133 / scale;
const defaultHeight = 177 / scale;

class Database extends Node {

  private dbImage = '/assets/database.png';
  private fireImage = '/assets/fire.png';
  
  public label: string;
  public opsLimit: number;
  
  private producer: Producer;
  private ops: number;

  constructor(
    producer: Producer, 
    id: string, label: string,
    x: number, y: number, 
    width: number = defaultWidth, height: number = defaultHeight,
  ) {
    super(id, x, y, width, height);
    this.producer = producer;
    this.label = label;
    this.ops = 0;
    this.opsLimit = 5;
    this.start();
  }

  public draw(sketch: P5) {
    const image = this.loadImage(sketch, this.dbImage);
    sketch.image(image, this.x, this.y, this.width, this.height);
    
    if (this.ops >= this.opsLimit) {
      const fire = this.loadImage(sketch, this.fireImage);
      sketch.image(fire, this.x, this.y, this.width, this.height);
    }

    if (this.label) {
      this.drawLabel(sketch, this.label);
    }
  }
  
  public transferArrived(transfer: Transfer): void {
    this.ops += 1;

    this.outgoing
      .filter(conn => conn.satisfies(transfer.content))
      .forEach(conn => this.producer.produce(new Transfer(this, conn.to, transfer.content)));
  }
  
  public transferDelivered(transfer: Transfer): void {

  }

  public updateState(payload: Payload): void {
    this.x = payload.x !== undefined ? payload.x : this.x;
    this.y = payload.y !== undefined ? payload.y : this.y;
    this.label = payload.label !== undefined ? payload.label : this.label;
    this.opsLimit = payload.opsLimit !== undefined ? payload.opsLimit : this.opsLimit;
  }

  public start(): void {
    setInterval(() => {
      if (this.ops > 0) {
        this.ops -= 1;
      }
    }, 1_000);
  }
}

export {
  Database,
};
