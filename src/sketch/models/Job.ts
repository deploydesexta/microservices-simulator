import { P5 } from "@/types";
import { Node } from "./Node";
import { Transfer } from "./Transfer";
import { Payload, Producer } from "@/sketch/StateManager";

const scale = 6;
const defaultWidth = 340 / scale;
const defaultHeight = 407 / scale;

class Job extends Node {

  private jobImage = '/assets/job.png';
  
  public label: string;
  public delay: number;
  
  private producer: Producer;
  private cron: NodeJS.Timer | null = null;

  constructor(
    producer: Producer, 
    id: string, label: string,
    x: number, y: number, 
    width: number = defaultWidth, height: number = defaultHeight,
  ) {
    super(id, x, y, width, height);
    this.producer = producer;
    this.label = label;
    this.delay = 2_000;
    this.startCron();
  }

  public draw(sketch: P5) {
    const image = this.loadImage(sketch, this.jobImage);
    sketch.image(image, this.x, this.y, this.width, this.height);

    if (this.label) {
      this.drawLabel(sketch, this.label);
    }
  }
  
  public startCron() {
    console.log('Starting cron');
    this.cron = setInterval(this.worker.bind(this), this.delay);
  }

  public stopCron() {
    console.log('Stopping cron');
    if (this.cron) {
      clearInterval(this.cron);
      this.cron = null;
    }
  }

  public transferArrived(transfer: Transfer): void {

  }
  
  public transferDelivered(transfer: Transfer): void {

  }

  public updateState(payload: Payload): void {
    this.x = payload.x !== undefined ? payload.x : this.x;
    this.y = payload.y !== undefined ? payload.y : this.y;
    this.label = payload.label !== undefined ? payload.label : this.label;

    if (payload.delay !== undefined) {
      this.delay = payload.delay;
      this.resetJob();
    }
  }

  private resetJob() {
    this.stopCron();
    this.startCron();
  }
  
  private worker() {
    this.outgoing.forEach(conn => {
      this.producer.produce(new Transfer(this, conn.to, { message: "Start" }));
    });
  }
}

export {
  Job
};

