import { useState, useEffect } from 'react';

import Bgd from '../assets/img/bgd.png';
import Bottle1 from '../assets/img/green-bottle.svg'
import Bottle2 from '../assets/img/yellow-bottle.svg'
import Bottle3 from '../assets/img/pink-bottle.svg'

import '../assets/scss/components/Game.scss'

import BottomBar from './BottomBar';
import ScoreBoard from './ScoreBoard';
import ChoiceResult from './ChoiceResult';

function Game() {
  const [score, setScore] = useState(0);
  const [bottles, setBottles] = useState(null);
  const [scoreBoard, setScoreBoard] = useState(null);

  
  useEffect(() => { 
    setTimeout(()=>{
      document.querySelector('.game').style.opacity = 1;
      document.querySelector('.game__parfumes').style.opacity = 1;
      document.querySelector('.score-board').style.opacity = 1;
      document.querySelector('.bottom-bar').style.opacity = 1;
      setBottles(document.querySelectorAll('.game__bottle'));
      setScoreBoard(document.querySelector('.score-board'));
    }, 100)
  },[]);  
  
  function handleDropAndUpdateScore(score) {
    setScore(score + 1);
  }

  const estiloDelDiv = {
    backgroundImage: `url(${Bgd})`,
  };

  return (
    <div className="game" style={estiloDelDiv}>
      <ScoreBoard score={score} />
      <div className="game__parfumes">
        <picture className="game__bottle" id="bottle-1">
          <img src={Bottle1} alt="Aqve Romane Bottle" />
          <ChoiceResult text={'Correcto! +1'} className={'right'} />
          <ChoiceResult text={'Error'} className={'wrong'} />
        </picture>
        <picture className="game__bottle" id="bottle-2">
          <img src={Bottle2} alt="Aqve Romane Bottle" />
          <ChoiceResult text={'Correcto! +1'} className={'right'} />
          <ChoiceResult text={'Error'} className={'wrong'} />
        </picture>
        <picture className="game__bottle" id="bottle-3">
          <img src={Bottle3} alt="Aqve Romane Bottle" />
          <ChoiceResult text={'Correcto! +1'} className={'right'} />
          <ChoiceResult text={'Error'} className={'wrong'} />
        </picture>
      </div>
      <BottomBar onDropAndUpdateScore={handleDropAndUpdateScore} bottles={bottles} scoreBoard={scoreBoard} />
    </div>
  );
}

export default Game;