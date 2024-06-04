import Logo from '../assets/img/logo.svg'
import Bgd from '../assets/img/main-bgd.png'
import PlayBtn from './buttons/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/scss/components/MainBackground.scss';

// Componente que muestra la imagen de fondo y el botón de play

function MainBackground() {
    const estiloDelDiv = {
        backgroundImage: `url(${Bgd})`,
    };
    const navigate = useNavigate()

    useEffect(() => {
      setTimeout(()=>{
        document.querySelector('.main-background__logo').style.transform = `translate(0px, 0px)`;
        document.querySelector('.button').style.transform = `translate(0px, 0px)`;
        document.querySelector('.main-background').style.opacity = 1;
        document.querySelector('.main-background__logo').style.opacity = 1;
        document.querySelector('.button').style.opacity = 1;
      }, 100)
    }, [])

    const handlePlayClick = () => {
      document.querySelector('.main-background__logo').style.opacity = 0;
      document.querySelector('.main-background').style.opacity = 0;
      document.querySelector('.button').style.opacity = 0;
      
      setTimeout(() => {
        navigate('/game')
      }, 200);
    };

  return (
    <div className="main-background" style={estiloDelDiv}>
      <div className="main-background__main">
        <div className="main-background__wrapper">
          <picture className="main-background__logo">
            <img src={Logo} alt="Laura Biaggioti Logo" />
          </picture>
          <h1>{'Come Giocare'}</h1>
          <p>{'Trascina gli elementi delle note olfattive che appartengono a ciascuna fragranza nel flacone. Se avrai indovinato almeno due elementi per fragranza ti basterà inserire i dati richiesti per scoprire subito se hai vinto... AD MAIORA!'}</p>
        </div>
      </div>
      <div className="button">
        <PlayBtn text={'Gioca'} onClick={handlePlayClick} />
      </div>
    </div>
  );
}

export default MainBackground;