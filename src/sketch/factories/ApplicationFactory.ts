import { Payload, Producer } from "@/sketch/StateManager";
import { LoadBalancer } from "../models/application/LoadBalancer";
import { Microservice } from "../models/application/Microservice";
import { Monolith } from "../models/application/Monolith";
import { Application } from "../models/application/Application";

export class ApplicationFactory {

    public static create(producer: Producer, props: Payload): Application {
        const { id, label, type } = props;
    
      let node;
      if (type === 'loadbalancer') {
        node = new LoadBalancer(producer, id, label, 50, 50)
      } else if (type === 'microservice') {
        node = new Microservice(producer, id, label, 50, 50)
      } else {
        node = new Monolith(producer, id, label, 50, 50)
      }
  
      return node;
    }
}