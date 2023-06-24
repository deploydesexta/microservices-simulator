import { Node } from '@/sketch/models/Node';
import { Edge } from '@/sketch/models/Edge';
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
  // Edges
  RemoveEdge: 'REMOVE_EDGE',
  SetEdge: 'SET_EDGE',
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
  edges: Record<string, Edge>;
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
      edges: {},
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

  public allEdges(): Edge[] {
    return Object.values(this.state.edges);
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

  public edgeOfNode(node: Node): Edge | undefined {
    return this.allEdges().find((edge: Edge) => 
      (edge.from.id === node.id) ||
        (edge.to.id === node.id)
    )
  }

  public allEdgesOfNode(node: Node): Edge[] {
    return this.allEdges().filter((edge: Edge) => 
      (edge.from.id === node.id) ||
        (edge.to.id === node.id)
    )
  }

  public edgeBetweenNodes(from: Node, to: Node):  Edge | undefined {
    return this.allEdges().find((edge: Edge) => 
      (edge.from === from && edge.to === to) ||
        (edge.to === from && edge.from === to)
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
      case Events.RemoveEdge:
        this.deleteEdge(payload.id);
        break;
      case Events.SetEdge:
        this.setEdge(payload.edge);
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

      this.allEdgesOfNode(node)
        .forEach(edge => this.deleteEdge(edge.id));
    }
  }

  private setEdge(payload: Payload) {
    this.state.edges[payload.id] = payload as Edge;
  }

  private deleteEdge(id: string) {
    const edge = this.state.edges[id];
    if (edge) {
      edge.from.disconnect(edge.to);
      edge.to.disconnect(edge.from);
      delete this.state.edges[id];
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
