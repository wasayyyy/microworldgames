import './App.css';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import Routers from './Routes'

function App() {
  return (
    <div className = "App" >
      <BrowserRouter basename="/microworldgames">
        <Routers />
      </BrowserRouter>  
    </div>
  );
}

export default App;
