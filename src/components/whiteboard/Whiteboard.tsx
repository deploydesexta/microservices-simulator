'use client';
import { useEffect, useRef } from 'react';
import './Whiteboard.css';
import Sketch from '../../sketch/Sketch';
import useStore from '../../store';
import { P5 } from '../../types';
import useEvents from '../../store/event-emitter';

function Whiteboard() {

  const eventListener = useEvents();
  const editNode = useStore(state => state.editNode);
  const whiteboardRed = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p5 = require('p5');
    if (!whiteboardRed.current) {
      return;
    }

    const props = {
      left: 'var(--sidebar-width)',
      top: 'var(--toolbar-height)',
      width: window.innerWidth,
      height: window.innerHeight - 60,
    };

    whiteboardRed.current.style.left = props.left;
    whiteboardRed.current.style.top = props.top;
    whiteboardRed.current.style.position = 'absolute';
    whiteboardRed.current.firstChild?.remove();
    
    const myP5 = new p5(
      (p5: P5) => Sketch(p5, props, eventListener.on, editNode), 
      whiteboardRed.current || undefined,
    ) as P5;

    return () => {
      eventListener.reset();
      myP5.remove();
    };
  }, [eventListener, editNode]);

  return (
    <div className="Whiteboard" ref={whiteboardRed}>
      <h1>Loading...</h1>
    </div>
  );
}

export default Whiteboard;
