// import { useState } from 'react'
import MainBackground from './components/MainBackground';
import Game from './components/Game';
import WinPage from './components/WinPage';
import Quasi from './components/Quasi';
import Form from './components/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import './assets/scss/utils/fonts.scss';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<MainBackground/>} />
          <Route path="/game" element={<Game/>} />
          <Route path="/win-page" element={<WinPage/>} />
          <Route path="/quasi" element={<Quasi/>} />
          <Route path="/form" element={<Form/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
