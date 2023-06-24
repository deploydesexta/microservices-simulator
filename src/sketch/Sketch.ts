import { P5, KeyPressedEvent } from '@/types';
import { Node } from './models/Node';
import { Route } from './models/Route';
import { Renderer } from 'p5';
import { StateManager, Events } from '@/sketch/StateManager';

export type SketchProps = {
  width: number;
  height: number;
}

function Sketch(sketch: P5, state: StateManager) {
  
  const DELETE = sketch.DELETE;
  const CTRL = sketch.CONTROL;
  const ALT = sketch.ALT;
  const SHIFT = sketch.SHIFT;
  const WIDTH = window.innerWidth// - 240;
  const HEIGHT = window.innerHeight// - 52;

  let tmpRoute: Route | null = null;
  let tmpNode: Node | null = null;
  let canvas: Renderer;
  let eyeX = 0;
  let eyeY = 0;
  let zoom = 1.0;

  sketch.setup = setup
  sketch.draw = draw;
  sketch.mouseDragged = mouseDragged;
  sketch.windowResized = windowResized;
  sketch.keyPressed = keyPressed;
  sketch.images = {};

  function setup() {
    canvas = sketch.createCanvas(WIDTH, HEIGHT);
    canvas.touchMoved(touchMoved);
    canvas.mouseClicked(mouseClicked);
    canvas.mousePressed(mousePressed);
    canvas.touchStarted(mousePressed);
    canvas.mouseReleased(mouseReleased);
    canvas.mouseWheel(mouseWheel);
    canvas.mouseOut(mouseOut);
  }

  function draw() {
    sketch.background(245);
    sketch.translate(eyeX, eyeY);
    sketch.cursor(sketch.HAND);
    
    state.allConnections().forEach(child => {
      child.draw(sketch);
    });
    
    state.allNodes().forEach(child => {
      child.draw(sketch);
    });
    
    tmpRoute?.draw(sketch);
    state.stage().draw(sketch);
  }

  function nodeBelowMouse(): Node | undefined {
    return state.nodeBelow(mouseX(), mouseY());
  }

  function altShiftOrCtrlKeyPressed(): boolean {
    const key = sketch.keyCode || 0;
    return sketch.keyIsPressed && (key === ALT || key === SHIFT || key === CTRL);
  }

  function deleteKeyPressed(event: KeyPressedEvent): boolean {
    return event.keyCode === DELETE ;
  }

  function keyPressed(event: KeyPressedEvent) {
    const target = nodeBelowMouse();
    if (target && deleteKeyPressed(event)) {
      state.dispatch({ event: Events.RemoveNode, payload: { id: target.id }})
    }
  }

  function windowResized() {
    sketch.resizeCanvas(sketch.windowWidth - 500, HEIGHT);
  }

  function touchMoved(event: TouchEvent) {
    event.preventDefault();
    eyeX += sketch.mouseX - sketch.pmouseX;
    eyeY += sketch.mouseY - sketch.pmouseY;
  }

  function mouseClicked() {
    console.log('mouseClicked');
    const node = nodeBelowMouse();
    if (node) {
      selectNode(node);
    }
  }
  
  function mousePressed() {
    console.log('mousePressed');
    tmpNode = nodeBelowMouse() || null;

    if (tmpNode && altShiftOrCtrlKeyPressed()) {
      tmpRoute = new Route(tmpNode, mouseX(), mouseY());
    }
  }

  function mouseDragged() {
    console.log('mouseDragged');
    if (tmpNode) {
      const mX = mouseX();
      const mY = mouseY();
      if (tmpRoute) {
        tmpRoute.update(mX, mY);
      } else {
        const x = mX - (tmpNode.width / 2);
        const y = mY - (tmpNode.height / 2);
        state.dispatch({ event: Events.UpdateNode, payload: { id: tmpNode.id, x, y } });
      }
      return;
    }
    
    eyeX += sketch.mouseX - sketch.pmouseX;
    eyeY += sketch.mouseY - sketch.pmouseY;
  }

  function mouseWheel(e: WheelEvent) {
    console.log('mouseWheel', e);
    // const factor = Math.pow(1.01, e.deltaX);
    // const newZoom = zoom * factor;
    // const dx = mouseX() - WIDTH / 2;
    // const dy = mouseY() - HEIGHT / 2;
    // eyeX += dx / zoom - dx / newZoom;
    // eyeY += dy / zoom - dy / newZoom;
    // zoom = newZoom;
  }

  function mouseOut() {
    console.log('mouseOut');
    tmpNode = null;
  }

  function mouseReleased() {
    console.log('mouseReleased');
    if (tmpRoute && tmpNode) {
      const from = tmpNode;
      const to = nodeBelowMouse();
      if (to && from.id !== to.id) {
        const connection = from.connectWith(to);
        if (connection) {
          state.dispatch({ event: Events.SetConnection, payload: { connection } });
        }
      }
    }
    tmpRoute = null;
    tmpNode = null;
  }

  function selectNode(node: Node | undefined) {
    state.dispatch({ event: Events.SelectNode, payload: { id: node?.id }});
  }

  function mouseX() {
    return sketch.mouseX - eyeX;
  }
  
  function mouseY() {
    return sketch.mouseY - eyeY;
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