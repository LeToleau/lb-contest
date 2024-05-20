import Bgd from '../assets/img/main-bgd.png';
import Bgd2 from '../assets/img/termas.png';
import Perfumes from '../assets/img/geles.png';
import Geles from '../assets/img/perfumes.png';
import PlayBtn from './buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../assets/scss/components/WinPage.scss';

// Componente que muestra la imagen de fondo y el botón de play

function WinPage() {
  const navigate = useNavigate();
  const [version, setVersion] = useState({
    cssClass: "",
    bgd: "",
    text: "",
    img: "",
    btnLink: ""
  });
  
  const estiloDelDiv = {
      backgroundImage: `url(${version.bgd})`,
  };

  useEffect(() => {
    const result = Math.floor(Math.random() * 3) + 1;

    switch (result) {
      case 1:
        setVersion({
          cssClass: "version-1",
          bgd: Bgd,
          text: "Hai Vinto una body lotion di Aqve Romane",
          img: Geles,
        });
        break;
      case 2:
        setVersion({
          cssClass: "version-1",
          bgd: Bgd,
          text: "Hai vinto uno dei profumi di Aqve Romane",
          img: Perfumes,
        });
        break;
      case 3:
        setVersion({
          cssClass: "version-2",
          bgd: Bgd2,
          text: "Hai vinto un weekend tra le acque termali di Roma",
        });
        break;
    }

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
    <div className={`win-page ${version.cssClass}`} style={estiloDelDiv}>
      <div className="win-page__card">
        <div className="win-page__text-wrapper">
          <h1>PREMIO</h1>
          <h2>{version.text}</h2>
          <picture className="win-page__img">
            <img src={version.img} alt="Prize Image" />
          </picture>
          <div className="button">
            <PlayBtn text={'Ottenere Regalo'} onClick={handlePlayClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WinPage;