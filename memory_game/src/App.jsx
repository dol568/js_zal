import "./App.css";
import { Game } from "./components/Game/Game";

const App = () => (
  <div>
    <h1>Memory Game</h1>
    <Game boardSize={16} />
  </div>
);

export default App;
