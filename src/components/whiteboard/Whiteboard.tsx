'use client';
import p5 from 'p5';
import { useLayoutEffect, useRef, memo, useState, useEffect } from 'react';
import { P5 } from '@/types';
import ws from '@/lib/socket';
import stateManager from '@/sketch/StateManager';
import Sketch from '@/sketch/Sketch';
import './Whiteboard.css';

type Props = {
  boardId: string;
  userId: string;
}

function Whiteboard({ boardId, userId }: Props) {
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

  useEffect(() => {
    const closeable = ws.listen(boardId, userId);
    return closeable;
  }, [boardId]);

  return (
    <div className="Whiteboard" ref={containerRef} />
  );
}

export default memo(Whiteboard);
