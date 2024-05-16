import Bgd from '../assets/img/quasi-bgd.png'
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
      <div className="quasi__card">
        <div className="win-page__text-wrapper">
          <h1>C&rsquo;ERI QUASI!</h1>
          <h2>partecipa all&rsquo;estrazione finale per un weekend a roma</h2>
          <div className="button">
            <PlayBtn text={'Partecipa'} onClick={handlePlayClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quasi;