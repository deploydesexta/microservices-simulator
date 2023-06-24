'use client';
import p5 from 'p5';
import { useLayoutEffect, useRef, memo, useState } from 'react';
import './Whiteboard.css';
import { P5 } from '@/types';
import stateManager from '@/sketch/StateManager';
import Sketch from '@/sketch/Sketch';

function Whiteboard() {
  console.log('rendering Whiteboard');

  const containerRef = useRef<HTMLDivElement>(null);
  const [sketch, setSketch] = useState<P5 | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    
    if (!sketch)  {
      const myP5 = new p5(
        (p5: P5) => Sketch(p5, stateManager), 
        containerRef.current || undefined,
      ) as P5;
      
      setSketch(myP5);
    }
  }, [sketch]);

  return (
    <div className="Whiteboard" ref={containerRef} />
  );
}

export default memo(Whiteboard);
