'use client';
import p5 from 'p5';
import { useEffect, useRef, memo } from 'react';
import './Whiteboard.css';
import Sketch from '../../sketch/Sketch';
import useStore from '../../store';
import { P5 } from '../../types';
import useEvents from '../../store/event-emitter';

function Whiteboard() {
  console.log('rendering Whiteboard');

  const eventListener = useEvents();
  const editNode = useStore(state => state.editNode);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const props = {
      left: 'var(--sidebar-width)',
      top: 'var(--toolbar-height)',
      width: window.innerWidth,
      height: window.innerHeight - 60,
    };

    containerRef.current.style.left = props.left;
    containerRef.current.style.top = props.top;
    containerRef.current.style.position = 'absolute';
    
    const myP5 = new p5(
      (p5: P5) => Sketch(p5, props, eventListener.on, editNode), 
      containerRef.current || undefined,
    ) as P5;

    return () => {
      eventListener.reset();
      myP5.remove();
    };
  }, [eventListener, editNode]);

  return (
    <div className="Whiteboard" ref={containerRef} />
  );
}

export default memo(Whiteboard);
