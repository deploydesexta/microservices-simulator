import { P5 } from "@/types";
import { Node } from "../Node";
import { Transfer } from "../Transfer";
import { Payload, Producer } from "@/sketch/StateManager";
import { Connection } from "../Connection";

const scale = 3;
const defaultWidth = 146 / scale;
const defaultHeight = 182 / scale;

export class Application extends Node {
  
  protected producer: Producer;
  public label: string;
  public image: string;

  constructor(
    producer: Producer, 
    id: string, label: string, image: string,
    x: number, y: number, 
    width: number = defaultWidth, height: number = defaultHeight,
  ) {
    super(id, x, y, width, height);
    this.producer = producer;
    this.label = label;
    this.image = image;
  }

  public draw(sketch: P5) {
    const image = this.loadImage(sketch, this.image);
    sketch.image(image, this.x, this.y, this.width, this.height);

    if (this.label) {
      this.drawLabel(sketch, this.label);
    }
  }
  
  public transferArrived(transfer: Transfer): void {
    this.outgoing
      .filter(conn => conn.satisfies(transfer.content))
      .forEach(conn => this.producer.produce(new Transfer(this, conn.to, transfer.content)));
  }
  
  public transferDelivered(transfer: Transfer): void {

  }

  public updateState(payload: Payload): void {
    this.x = payload.x != undefined ? payload.x : this.x;
    this.y = payload.y != undefined ? payload.y : this.y;
    this.width = payload.width != undefined ? payload.width : this.width;
    this.height = payload.height != undefined ? payload.height : this.height;
    this.label = payload.label != undefined ? payload.label : this.label;
  }
}