import { Node } from "./Node";

type Message = {
  [key: string]: any
};

interface Producer {
  produce(to: Node, message: Message): void;
}

export type {
  Producer,
}