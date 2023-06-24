import { Node } from '@/sketch/models/Node';
import { Connection } from '@/sketch/models/Connection';
import { Job } from '@/sketch/models/Job';
import { Transfer } from '@/sketch/models/Transfer';
import { StageManager } from '@/sketch/StageManager';
import { NodeFactory } from '@/sketch/factories/NodeFactory';

export type Payload = {
  [prop: string]: any
}

export type Event = {
  event: string;
  payload: Payload;
}

export interface Producer {
  produce(transfer: Transfer): void;
}

export const Events = {
  // Connections
  RemoveConnection: 'REMOVE_CONNECTION',
  SetConnection: 'SET_CONNECTION',
  // Nodes
  AddNode: 'ADD_NODE',
  UpdateNode: 'UPDATE_NODE',
  SelectNode: 'SELECT_NODE',
  RemoveNode: 'REMOVE_NODE',
  MoveNode: 'MOVE_NODE',
  // Actors
  SendRequest: 'SEND_REQUEST',
  StartJob: 'START_JOB',
  StopJob: 'STOP_JOB',
}

export type State = {
  target: Node | undefined;
  nodes: Record<string, Node>;
  connections: Record<string, Connection>;
  stage: StageManager;
}

export type StateObserver = (cmd: Event) => void;

export class StateManager implements Producer {

  private state: State;
  private observers: Set<StateObserver> = new Set();

  constructor() {
    this.state = {
      target: undefined,
      nodes: {},
      connections: {},
      stage: new StageManager(),
    };
  }

  public produce(transfer: Transfer): void {
    this.state.stage.add(transfer);
  }
  
  public subscribe(observer: StateObserver) {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }

  public getState(): State {
    return this.state;
  }

  public allConnections(): Connection[] {
    return Object.values(this.state.connections);
  }

  public allNodes(): Node[] {
    return Object.values(this.state.nodes);
  }
  
  public stage(): StageManager {
    return this.state.stage;
  }
  
  public nodeOfId(id: string): Node | undefined {
    return this.state.nodes[id];
  }

  public allConnectionsOfNode(node: Node): Connection[] {
    return this.allConnections().filter((conn: Connection) => 
      (conn.from.id === node.id) ||
        (conn.to.id === node.id)
    )
  }

  public connectionBetween(from: Node, to: Node):  Connection | undefined {
    return this.allConnections().find((conn: Connection) => 
      (conn.from === from && conn.to === to) ||
        (conn.to === from && conn.from === to)
    );
  }
  
  public nodeBelow(x: number, y: number): Node | undefined {
    return this.allNodes().find((child) => child.isBelow(x, y));
  }

  public selectNode(node: Node | undefined) {
    this.dispatch({ event: Events.SelectNode, payload: { node }});
  }

  public selectedNode():  Node | undefined {
    return this.state.target;
  }

  public dispatch(cmd: Event): void {
    const { event, payload } = cmd;

    switch (event) {
      case Events.RemoveConnection:
        this.deleteConnection(payload.id);
        break;
      case Events.SetConnection:
        this.setConnection(payload.connection);
        break;
      case Events.RemoveNode:
        this.deleteNode(payload.id);
        break;
      case Events.AddNode:
        this.setNode(NodeFactory.create(this, payload));
        break;
      case Events.UpdateNode:
        this.updateNode(payload);
        break;
      case Events.SelectNode:
        this.state.target = this.nodeOfId(payload.id);
        break;
      case Events.SendRequest:
        this.sendRequest(payload);
        break;
      case Events.StartJob:
        this.startJob(payload);
        break;
      case Events.StopJob:
        this.stopJob(payload);
        break;
    }

    this.observers.forEach((observer) => observer(cmd));
  }

  private stopJob(payload: Payload) {
    (this.nodeOfId(payload.id) as Job)?.stopCron();
  }
  
  private startJob(payload: Payload) {
    (this.nodeOfId(payload.id) as Job)?.startCron();
  }

  private updateNode(payload: Payload) {
    const node = this.state.nodes[payload.id];
    if (node) {
      node.updateState(payload);
    }
  }
  
  private setNode(node: Node) {
    this.state.nodes[node.id] = node;
  }

  private deleteNode(id: string) {
    const node = this.state.nodes[id];
    if (node) {
      delete this.state.nodes[id];

      this.allConnectionsOfNode(node)
        .forEach(conn => this.deleteConnection(conn.id));
    }
  }

  private setConnection(payload: Payload) {
    this.state.connections[payload.id] = payload as Connection;
  }

  private deleteConnection(id: string) {
    const conn = this.state.connections[id];
    if (conn) {
      conn.from.disconnect(conn.to);
      conn.to.disconnect(conn.from);
      delete this.state.connections[id];
    }
  }

  private sendRequest(payload: Payload) {    
    const from = this.nodeOfId(payload.from);
    const to = this.nodeOfId(payload.to);

    if (from && to) {
      this.produce(new Transfer(from, to, { message: 'HI' }))
    } else if (from) {
      from.outgoing.forEach((to: Node) => {
        this.produce(new Transfer(from, to, { message: 'HI' }))
      });
    }
  }
}

const stateManager = new StateManager();

export default stateManager;
