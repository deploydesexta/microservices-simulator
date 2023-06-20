import { Content, Listener } from '../types';

class EventEmitter {
  listeners: { [n: string]: Listener[] } = {};

  on(event: string, listener: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  emit(event: string, data: Content) {
    const listeners = this.listeners[event];

    if (listeners) {
      listeners.forEach(listener => listener(data));
    }
  }
}

const myEmitter = new EventEmitter();

const useEvents = () => {
  const on = (event: string, listener: (data: any) => void) => {
    myEmitter.on(event, listener);
  }

  const emit = (event: string, data: any) => {
    myEmitter.emit(event, data);
  }

  const reset = () => {
    myEmitter.listeners = {};
  }
  
  return { on, emit, reset };
};

export default useEvents;