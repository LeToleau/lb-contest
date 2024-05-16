import Bgd from '../assets/img/main-bgd.png'
import PlayBtn from './buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import '../assets/scss/components/WinPage.scss';

// Componente que muestra la imagen de fondo y el botón de play

function WinPage() {
  const estiloDelDiv = {
      backgroundImage: `url(${Bgd})`,
  };
  const navigate = useNavigate()

  useEffect(() => {
    //document.querySelector('.main-background__logo').style.transform = `translate(0px, 0px)`;
    //document.querySelector('.button').style.transform = `translate(0px, 0px)`;

    setTimeout(()=>{
      document.querySelector('.win-page').style.opacity = 1;
      document.querySelector('.win-page__card').style.opacity = 1;
      document.querySelector('.button').style.opacity = 1;
    }, 100)
  }, [])

  const handlePlayClick = () => {
    document.querySelector('.win-page').style.opacity = 0;
    document.querySelector('.win-page__card').style.opacity = 0;
    document.querySelector('.button').style.opacity = 0;
    
    setTimeout(() => {
      navigate('/')
    }, 1200);
  };

  return (
    <div className="win-page" style={estiloDelDiv}>
      <div className="win-page__card">
        <div className="win-page__text-wrapper">
          <h1>Hai Vinto!</h1>
          <h2>Il Tuo Regalo Ti Aspetta</h2>
          <div className="button">
            <PlayBtn text={'Ottenere Regalo'} onClick={handlePlayClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WinPage;