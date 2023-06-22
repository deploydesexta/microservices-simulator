import { Node } from './Node';
import { Content, P5, KeyPressedEvent } from '../types';
import { TmpEdge } from './TmpEdge';
import { Edge } from './Edge';
import { Stage } from './Stage';
import { Application, Microservice, Monolith } from './Application';
import { RDBMS } from './Database';
import { Transfer } from './Transfer';
import { LoadBalancer } from './LoadBalancer';
import { Job } from './Job';
import { Camera } from 'p5';

export type SketchProps = {
  width: number;
  height: number;
}

function Sketch(
  sketch: P5,
  props: SketchProps,
  on: (event: string, hook: (message: Content) => void) => void,
  editNode: (node: Node) => void,
) {
 
  const DELETE = sketch.DELETE;
  const CTRL = sketch.CONTROL;
  const ALT = sketch.ALT;
  const SHIFT = sketch.SHIFT;
  const WIDTH = props.width;
  const HEIGHT = props.height;

  let tmpEdge: TmpEdge | null = null;
  let tmpNode: Node | null = null;
  let target: Node | null = null;
  let camera: Camera;

  const nodes: Map<string, Node> = new Map();
  const children: Node[] = [];
  const edges: Edge[] = [];
  const stage = new Stage()

  sketch.editNode = editNode;
  sketch.setup = setup
  sketch.draw = draw;
  sketch.touchMoved = touchMoved;
  sketch.mouseClicked = mouseClicked;
  sketch.mouseDragged = mouseDragged;
  sketch.mousePressed = mousePressed;
  sketch.touchStarted = mousePressed;
  sketch.mouseReleased = mouseReleased;
  sketch.windowResized = windowResized;
  sketch.keyPressed = keyPressed;
  
  on('add_application', addApplication);
  on('set_application', updateApplication);
  on('add_database', addDatabase);
  on('add_job', addJob);
  on('stop_job', stopJob);
  on('start_job', startJob);
  on('send_request', sendRequest);

  function setup() {
    sketch.images = {
      cache: sketch.loadImage('/assets/cache.png'),
      cluster: sketch.loadImage('/assets/cluster.png'),
      database: sketch.loadImage('/assets/database.png'),
      fire: sketch.loadImage('/assets/fire.png'),
      job: sketch.loadImage('/assets/job.png'),
      loadBalancer: sketch.loadImage('/assets/loadBalancer.png'),
      microservice: sketch.loadImage('/assets/microservice.png'),
      monolith: sketch.loadImage('/assets/monolith.png'),
    }

    sketch.createCanvas(WIDTH, HEIGHT);
    sketch.smooth();
    // camera = sketch.createCamera();
  }

  function draw() {
    sketch.background(245);
    sketch.cursor(sketch.HAND);
    
    edges.forEach((child: Edge) => {  
      child.draw();
    });

    children.forEach((child: Node) => {  
      child.draw();
    });
  
    if (tmpEdge != null) {
      tmpEdge.draw();
    }

    stage.draw();
  }

  function altShiftOrCtrlKeyPressed(): boolean {
    const key = sketch.keyCode || 0;
    return sketch.keyIsPressed && (key === ALT || key === SHIFT || key === CTRL);
  }

  function deleteKeyPressed(event: KeyPressedEvent): boolean {
    return event.keyCode === DELETE ;
  }

  function keyPressed(event: KeyPressedEvent) {
    if(deleteKeyPressed(event) && target !== null) {
      removeApplication(target)
      removeEdge(target)
    }
  }
  
  const nodeOfId = (id: string) => nodes.get(id)
  
  const nodeBelowMouse = () => {
    const {mouseX, mouseY} = sketch
    return children.find((child: Node) => child.isBelow(mouseX, mouseY))
  }

  function windowResized() {
    sketch.resizeCanvas(sketch.windowWidth - 500, HEIGHT);
  }

  function touchMoved(event: TouchEvent) {
    event.preventDefault();
    console.log(event);
    const eyeX = sketch.mouseX - sketch.pmouseX;
    const eyeY = sketch.mouseY - sketch.pmouseY;
    camera.move(eyeX, eyeY, 0);
  }

  function mouseClicked() {
    nodeBelowMouse()?.mouseClicked();
  }

  function mouseDragged() {
    if (target) {
      if (tmpEdge) {
        tmpEdge.mouseDragged();
      } else {
        target.mouseDragged()
      }
      return;
    }
    
    // const eyeX = sketch.mouseX - sketch.pmouseX;
    // const eyeY = sketch.mouseY - sketch.pmouseY;
    // camera.move(eyeX, eyeY, 0);
  }
  
  function mousePressed() {
    target = nodeBelowMouse() || null;
  
    if (target != null && altShiftOrCtrlKeyPressed()) {
      tmpNode = target;
      tmpEdge = new TmpEdge(sketch, target, sketch.mouseX, sketch.mouseY);
    }
  }

  function mouseReleased() {
    if (tmpEdge && tmpNode) {
      const from = tmpNode;
      const target = nodeBelowMouse();
      if (target && from.id !== target.id) {
        if (addEdge(from, target)) {
          from.connectWith(target);
          target.connectedWith(from);
        }
      }
    }
    tmpEdge = null;
    tmpNode = null;
  }

  function removeApplication(node: Node) {
    const nodeIndex = children.findIndex(child => child.id === node.id)
    children.splice(nodeIndex, 1)
    nodes.delete(node.id);
  }

  function addApplication(content: Content) {
    const { id, label, type } = content;

    let node;
    if (type === 'loadbalancer') {
      node = new LoadBalancer(sketch, stage, id, 50, 50, label)
    } else if (type === 'microservice') {
      node = new Microservice(sketch, stage, id, 50, 50, label)
    } else {
      node = new Monolith(sketch, stage, id, 50, 50, label)
    }

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
  
  function addJob(content: Content) {
    const { id, label } = content;
    const node = new Job(sketch, stage, id, 50, 50, label);
    children.push(node);
    nodes.set(id, node);
  }

  function stopJob(content: Content) {
    (nodeOfId(content.id) as Job)?.stopCron();
  }
  
  function startJob(content: Content) {
    (nodeOfId(content.id) as Job)?.startCron();
  }
  
  function sendRequest(content: Content) {    
    const from = nodeOfId(content.from);
    const to = nodeOfId(content.to);

    if (from && to) {
      stage.push(new Transfer(sketch, from, to, content))
    } else if (from) {
      from.outgoing.forEach((to: Node) => {
        stage.push(new Transfer(sketch, from, to, content))
      });
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

  function removeEdge(node: Node) {
    const indexEdge = edges.findIndex((edge: Edge) => 
      (edge.from.id === node.id) ||
        (edge.to.id === node.id)
    );
    
    if (indexEdge === -1) {
      return null;
    }
    
    edges.splice(indexEdge, 1);
    removeEdge(node)
  }

  // From http://www.openprocessing.org/sketch/7029
  /*
   * Draws a lines with arrows of the given angles at the ends.
   * x0 - starting x-coordinate of line
   * y0 - starting y-coordinate of line
   * x1 - ending x-coordinate of line
   * y1 - ending y-coordinate of line
   * startAngle - angle of arrow at start of line (in radians)
   * endAngle - angle of arrow at end of line (in radians)
   * solid - true for a solid arrow; false for an "open" arrow
   */
  sketch.arrowLine = (x0: number, y0: number, x1: number, y1: number, size: number, startAngle: number, endAngle: number, solid: boolean) => {
    sketch.line(x0, y0, x1, y1);
    if (startAngle !== 0) {
      sketch.arrowHead(x0, y0, size,  sketch.atan2(y1 - y0, x1 - x0), startAngle, solid);
    }
    if (endAngle !== 0) {
      sketch.arrowHead(x1, y1, size, sketch.atan2(y0 - y1, x0 - x1), endAngle, solid);
    }
  }
  
  /*
   * Draws an arrow head at given location
   * x0 - arrow vertex x-coordinate
   * y0 - arrow vertex y-coordinate
   * lineAngle - angle of line leading to vertex (radians)
   * arrowAngle - angle between arrow and line (radians)
   * solid - true for a solid arrow, false for an "open" arrow
   */
  sketch.arrowHead = (x0: number, y0: number, size: number, lineAngle: number, arrowAngle: number, solid: boolean) => {
    const x2 = x0 + size * sketch.cos(lineAngle + arrowAngle);
    const y2 = y0 + size * sketch.sin(lineAngle + arrowAngle);
    const x3 = x0 + size * sketch.cos(lineAngle - arrowAngle);
    const y3 = y0 + size * sketch.sin(lineAngle - arrowAngle);
    // green color
    sketch.stroke(255, 0, 0);
    if (solid) {
      sketch.triangle(x0, y0, x2, y2, x3, y3);
    } else {
      sketch.line(x0, y0, x2, y2);
      sketch.line(x0, y0, x3, y3);
    }
  }
}

export default Sketch;