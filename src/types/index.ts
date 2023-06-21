import p5, { Image } from "p5";
import { EditNode } from "../store";

export type Images = {
  cache: Image;
  cluster: Image;
  database: Image;
  fire: Image;
  job: Image;
  loadBalancer: Image;
  microservice: Image;
  monolith: Image;
}

export type Listener = (data: Content) => void

export type Content = {
  [n: string]: string;
}

export type KeyPressedEvent = {
  keyCode: number
}

export type P5 = p5 & {
  editNode: EditNode;
  produce: (from: string, to: string, content: Content) => void;
  arrowLine: (x0: number, y0: number, x1: number, y1: number, size: number, startAngle: number, endAngle: number, solid: boolean) => void;
  arrowHead: (x0: number, y0: number, size: number, lineAngle: number, arrowAngle: number, solid: boolean) => void;
  images: Images;
}