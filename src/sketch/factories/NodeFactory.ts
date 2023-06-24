import { Payload, Producer } from "@/sketch/StateManager";
import { Node } from "@/sketch/models/Node";
import { ApplicationFactory } from "./ApplicationFactory";
import { DatabaseFactory } from "./DatabaseFactory";
import { JobFactory } from "./JobFactory";

const applicationTypes = ['loadbalancer', 'microservice', 'monolith'];
const databaseTypes = ['documentdb', 'kvs', 'rdbms'];
const jobTypes = ['cron'];

export class NodeFactory {

    public static create(producer: Producer, props: Payload): Node {
      const type = props.type;

      if (applicationTypes.includes(type)) {
        return ApplicationFactory.create(producer, props);
      } else if (databaseTypes.includes(type)) {
        return DatabaseFactory.create(producer, props);
      } else if (jobTypes.includes(type)) {
        return JobFactory.create(producer, props);
      }

      throw new Error(`Unknown node type: ${type}`);
    }
}