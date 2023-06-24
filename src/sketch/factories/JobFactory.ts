import { Payload, Producer } from "@/sketch/StateManager";
import { Job } from "@/sketch/models/Job";

export class JobFactory {

    public static create(producer: Producer, props: Payload): Job {
      const { id, label, type } = props;
    
      let node;
      if (type === 'cron') {
        node = new Job(producer, id, label, 50, 50)
      } else {
        throw new Error(`Unknown node type: ${type}`);
      }
  
      return node;
    }
}