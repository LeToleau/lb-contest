// import { useState } from 'react'
import MainBackground from './components/MainBackground';
import Game from './components/Game';
import WinPage from './components/WinPage';
import Quasi from './components/Quasi';
import Form from './components/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import './assets/scss/utils/fonts.scss';
import StartPage from './components/StartPage';
import { UniqueIdProvider } from './contexts/UniqueIdContext';
import { GameStatusProvider } from './contexts/GameStatusContext';

function App() {
  return (
    <div className="App">
      <GameStatusProvider>
        <UniqueIdProvider>
          <Router>
            <Routes>
              <Route path="/" element={<StartPage/>} />
              <Route exact path="/play" element={<MainBackground/>} />
              <Route path="/game" element={<Game/>} />
              <Route path="/win-page" element={<WinPage/>} />
              <Route path="/quasi" element={<Quasi/>} />
              <Route path="/contest-form" element={<Form/>} />
            </Routes>
          </Router>
        </UniqueIdProvider>
      </GameStatusProvider>
    </div>
  )
}

export default App
