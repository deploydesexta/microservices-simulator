import { useEffect, useState } from 'react';
import stateManager, { Events, Payload, State } from './StateManager';
import { Node } from '@/sketch/models/Node';
import { Connection } from './models/Connection';

const useStateManager = (selector?: (state: State) => Partial<State>) => {
  const [state, setState] = useState<Node | Connection | undefined>(() => stateManager.getState().target);
  
  const addNode = (data: Payload) => 
    stateManager.dispatch({ event: Events.AddNode, payload: data });
  
  const updateNode = (data: Payload) => 
    stateManager.dispatch({ event: Events.UpdateNode, payload: data });
  
  const updateConnection = (data: Payload) => 
    stateManager.dispatch({ event: Events.UpdateConnection, payload: data });

  const sendRequest = (data: Payload) => 
    stateManager.dispatch({ event: Events.SendRequest, payload: data });
  
  const startJob = (data: Payload) => 
    stateManager.dispatch({ event: Events.StartJob, payload: data });
  
  const stopJob = (data: Payload) => 
    stateManager.dispatch({ event: Events.StopJob, payload: data });

  useEffect(() => {
    const callback = () => {
      console.log('state updated');
      setState(stateManager.getState().target);
    };
    const unsubscribe = stateManager.subscribe(callback);
    callback();
    return unsubscribe;
  }, [selector]);

  return { addNode, sendRequest, state, startJob, stopJob, updateConnection, updateNode };
};

export default useStateManager;
