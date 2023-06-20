import { useEffect, useRef } from 'react';
import p5 from 'p5';
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
    const props = { width: 800, height: 600 };
    
    const myP5 = new p5(
      (p5) => Sketch(p5, props, eventListener.on, editNode), 
      whiteboardRed.current || undefined,
    ) as P5;

    return () => {
      eventListener.reset();
      myP5.remove();
    };
  }, [eventListener, editNode]);

  return (
    <div className="Whiteboard" ref={whiteboardRed} />
  );
}

export default Whiteboard;
