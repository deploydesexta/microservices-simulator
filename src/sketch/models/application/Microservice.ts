import { Producer } from "@/sketch/StateManager";
import { Application } from "./Application";

const scale = 3;
const defaultWidth = 146 / scale;
const defaultHeight = 182 / scale;

const msImage = '/assets/microservice.png';

export class Microservice extends Application {
  
  constructor(
    producer: Producer,
    id: string, label: string,
    x: number, y: number, 
    width: number = defaultWidth, height: number = defaultHeight,
  ) {
    super(producer, id, label, msImage, x, y, width, height);
  }
}