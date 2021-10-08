import logo from './logo.svg';
import './App.css';
import Board from './app/kboard/board';

function App() {
  return (
    <div className="App">
      <Board width={800} height={600}/>
    </div>
  );
}

export default App;
