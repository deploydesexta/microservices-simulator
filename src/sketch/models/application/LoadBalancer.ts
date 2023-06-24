import { Producer } from "@/sketch/StateManager";
import { Transfer } from "../Transfer";
import { Application } from "./Application";

const scale = 3;
const defaultWidth = 170 / scale;
const defaultHeight = 49 / scale;
const msImage = '/assets/loadbalancer.png';

export class LoadBalancer extends Application {
  
  constructor(
    producer: Producer,
    id: string, label: string,
    x: number, y: number, 
    width: number = defaultWidth, height: number = defaultHeight,
  ) {
    super(producer, id, label, msImage, x, y, width, height);
  }

  public transferArrived(transfer: Transfer): void {
    // round robing to outgoing nodes
    const nextNode = this.outgoing.shift();
    if (nextNode) {
      this.producer.produce(new Transfer(this, nextNode, transfer.content));
      this.outgoing.push(nextNode);
    }
  }
}