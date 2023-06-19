import './App.css';
import Whiteboard from '../whiteboard/Whiteboard';
import Management from '../management/Management';

function App() {
  return (
    <div className="App  mt-5">
      <div className="container">
        <div className="row">
          <h1>Microservices Simulator</h1>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-md-4">
            <Management />
          </div>
          <div className="col-12 col-md-8">
            <Whiteboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
