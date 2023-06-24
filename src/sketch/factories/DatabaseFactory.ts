import { Payload, Producer } from "@/sketch/StateManager";
import { Database } from "../models/Database";

export class DatabaseFactory {

    public static create(producer: Producer, props: Payload): Database {
        const { id, label, type } = props;
    
      let node;
      if (type === 'rdbms' || type === 'documentdb' || type === 'kvs') {
        node = new Database(producer, id, label, 50, 50)
      } else {
        throw new Error(`Unknown node type: ${type}`);
      }
  
      return node;
    }
}