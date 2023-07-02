import stateManager from '@/sketch/StateManager'

const makeUrl = (boardId: string, userId: string) => {
  const { protocol, hostname } = window.location;
  const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';
  return `${wsProtocol}//${hostname}:8081/boards/${boardId}/ws?userId=${userId}`;
}

function listen(boardId: string, userId: string) {
  const ws = new WebSocket(makeUrl(boardId, userId));

  let unsubscribe = () => {}

  ws.onopen = () => {
    console.log('Connected')
    unsubscribe = stateManager.subscribe((event) => {
      ws.send(JSON.stringify(event))
    })
  }

  ws.onmessage = (evt) => {
    stateManager.dispatch(JSON.parse(evt.data), true)
  }
  
  ws.onerror = (error) => {
    console.log(error)
  }
  
  ws.onclose = () => {
    unsubscribe()
  }

  return () => {
    ws.close()
  }
}

const fakeListen = (boardId: string, userId: string) => {
};

const socket = {
  listen: fakeListen,
}

export default socket