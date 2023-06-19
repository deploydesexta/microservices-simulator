import { Node } from './Node';
import { Content, P5 } from '../types';
import { TmpEdge } from './TmpEdge';
import { Edge } from './Edge';
import { Stage } from './Stage';
import { Application, Microservice } from './Application';
import { Database, RDBMS } from './Database';
import { Transfer } from './Transfer';

export type SketchProps = {
  width: number;
  height: number;
}

let tmpEdge: TmpEdge | null = null;
let tmpNode: Node | null = null;
let target: Node | null = null;
  
const nodes: Map<string, Node> = new Map();
const children: Node[] = [];
const edges: Edge[] = [];
const stage = new Stage()

function Sketch(
  sketch: P5,
  props: SketchProps,
  on: (event: string, hook: (message: Content) => void) => void,
  editNode: (node: Node) => void,
) {

  const ALT = sketch.ALT;
  const SHIFT = sketch.SHIFT;
  const WIDTH = sketch.windowWidth - 500;
  const HEIGHT = props.height;

  sketch.setup = setup
  sketch.editNode = editNode;
  sketch.draw = draw;
  sketch.mouseClicked = mouseClicked;
  sketch.mouseDragged = mouseDragged;
  sketch.mousePressed = mousePressed;
  sketch.mouseReleased = mouseReleased;
  sketch.windowResized = windowResized;
  
  on('add_application', addApplication);
  on('set_application', updateApplication);
  on('add_database', addDatabase);
  on('send_request', sendRequest);

  function setup() {
    sketch.createCanvas(WIDTH, HEIGHT);
    sketch.smooth();
  }

  function draw() {
    sketch.background(255);
    sketch.stroke(0);
    sketch.strokeWeight(2);
    sketch.noFill();
    sketch.rect(0, 0, WIDTH, HEIGHT);

    children.forEach((child: Node) => {  
      child.draw();
    });
    
    edges.forEach((child: Edge) => {  
      child.draw();
    });
  
    if (tmpEdge != null) {
      tmpEdge.draw();
    }
  
    if (tmpNode != null) {
      tmpNode.draw();
    }

    stage.draw();
  }

  function altOrShiftKeyPressed(): boolean {
    const key = sketch.keyCode || 0;
    return sketch.keyIsPressed && (key === ALT || key === SHIFT);
  }
  
  const nodeOfId = (id: string) => nodes.get(id)
  
  const nodeBelowMouse = () => {
    const {mouseX, mouseY} = sketch
    return children.find((child: Node) => child.isBelow(mouseX, mouseY))
  }

  function windowResized() {
    sketch.resizeCanvas(sketch.windowWidth - 500, HEIGHT);
  }

  function mouseClicked() { 
    console.log('mouseClicked');
    nodeBelowMouse()?.mouseClicked();
  }

  function mouseDragged() {
    console.log('mouseDragged');
    if (target) {
      if (tmpEdge) {
        tmpEdge.mouseDragged();
      } else {
        target.mouseDragged()
      }
    }
  }
  
  function mousePressed() {
    console.log('mousePressed');
    target = nodeBelowMouse() || null;
  
    if (target != null && altOrShiftKeyPressed()) {
      tmpNode = target;
      tmpEdge = new TmpEdge(sketch, target, sketch.mouseX, sketch.mouseY);
    }
  }

  function mouseReleased() {
    console.log('mouseReleased');
    if (tmpEdge && tmpNode) {
      const from = tmpNode;
      const target = nodeBelowMouse();
      if (target && from.id !== target.id) {
        if (addEdge(from, target)) {
          target.connectWith(from);
        }
      }
    }
    tmpEdge = null;
    tmpNode = null;
  }

  function addApplication(content: Content) {
    const { id, label } = content;
    const node = new Microservice(sketch, stage, id, 50, 50, label)
    children.push(node);
    nodes.set(id, node)
  }
  
  function updateApplication(content: Content) {
    const { id, label } = content;
    const node = nodeOfId(id) as Application;
    if (node) {
      node.updateProps(label);
    }
  }

  function addDatabase(content: Content) {
    const { id, label } = content;
    const node = new RDBMS(sketch, stage, id, 50, 50, label);
    children.push(node);
    nodes.set(id, node);
  }
  
  function sendRequest(content: Content) {    
    const from = nodeOfId(content.from);
    const to = nodeOfId(content.to);

    if (from && to) {
      stage.push(new Transfer(sketch, from, to, content))
    }
  }

  function addEdge(from: Node, to: Node) {
    const existentEdge = edges.find((edge: Edge) => 
      (edge.from === from && edge.to === to) ||
        (edge.to === from && edge.from === to)
    );
    if (existentEdge) {
      return null;
    }
    
    const edge = new Edge(sketch, from, to);
    edges.push(edge);
    return edge;
  }
}

export default Sketch;