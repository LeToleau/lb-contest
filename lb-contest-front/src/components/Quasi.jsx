import Bgd from '../assets/img/main-bgd.png'
import PlayBtn from './buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import '../assets/scss/components/Quasi.scss';

// Componente que muestra la imagen de fondo y el botón de play

function Quasi() {
  const estiloDelDiv = {
      backgroundImage: `url(${Bgd})`,
  };
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(()=>{
      document.querySelector('.quasi').style.opacity = 1;
      document.querySelector('.quasi__card').style.opacity = 1;
      document.querySelector('.button').style.opacity = 1;
    }, 100)
  }, [])

  const handlePlayClick = () => {
    document.querySelector('.quasi').style.opacity = 0;
    document.querySelector('.quasi__card').style.opacity = 0;
    document.querySelector('.button').style.opacity = 0;
    
    setTimeout(() => {
      navigate('/')
    }, 1200);
  };

  return (
    <div className="quasi" style={estiloDelDiv}>
      <div className="quasi__overlay"></div>
      <div className="quasi__card">
        <div className="quasi__text-wrapper">
          <h1>C&rsquo;ERI QUASI!</h1>
          <h2>Non hai vinto</h2>
          <p>Ti terremo aggiornato sulle future iniziative di Laura Biagiotti Parfums</p>
        </div>
      </div>
      <div className="button">
        <PlayBtn text={`Torna All'Inizio`} onClick={handlePlayClick} />
      </div>
    </div>
  );
}

export default Quasi;