import { useEffect, useState } from 'react';
import stateManager, { Events, Payload, State } from './StateManager';
import { Node } from '@/sketch/models/Node';

const useStateManager = (selector?: (state: State) => Partial<State>) => {
  const [state, setState] = useState<Node | undefined>(() => stateManager.getState().target);
  
  const addNode = (data: Payload) => 
    stateManager.dispatch({ event: Events.AddNode, payload: data });
  
  const updateNode = (data: Payload) => 
    stateManager.dispatch({ event: Events.UpdateNode, payload: data });

  const sendRequest = (data: Payload) => 
    stateManager.dispatch({ event: Events.SendRequest, payload: data });
  
  const startJob = (data: Payload) => 
    stateManager.dispatch({ event: Events.StartJob, payload: data });
  
  const stopJob = (data: Payload) => 
    stateManager.dispatch({ event: Events.StopJob, payload: data });

  useEffect(() => {
    const callback = () => setState(stateManager.getState().target);
    const unsubscribe = stateManager.subscribe(callback);
    callback();
    return unsubscribe;
  }, [selector]);

  return { addNode, sendRequest, state, startJob, stopJob, updateNode };
};

export default useStateManager;
