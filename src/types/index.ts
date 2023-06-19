import p5 from "p5";
import { EditNode } from "../store";

export type Listener = (data: Content) => void

export type Content = {
  [n: string]: string;
}

export type P5 = p5 & {
  editNode: EditNode;
  produce: (from: string, to: string, content: Content) => void;
}