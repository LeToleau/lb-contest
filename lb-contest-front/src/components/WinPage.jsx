import Bgd from '../assets/img/main-bgd.png';
import Bgd2 from '../assets/img/termas.png';
import Perfumes from '../assets/img/geles.png';
import Geles from '../assets/img/perfumes.png';
import PlayBtn from './buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../assets/scss/components/WinPage.scss';
import axios from 'axios';
import { useUniqueId } from '../contexts/UniqueIdContext';

// Componente que muestra la imagen de fondo y el botón de play

function WinPage() {
  const navigate = useNavigate();
  const { uniqueId } = useUniqueId();

  const [version, setVersion] = useState({
    cssClass: "",
    bgd: "",
    text: "",
    text2: "",
    img: "",
    btnLink: ""
  });
  
  const estiloDelDiv = {
      backgroundImage: `url(${version.bgd})`,
  };

  
  const fetchPrize = async (url) => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {

        switch (response.data.prize) {
          case "prize2":
            setVersion({
              cssClass: "version-1",
              bgd: Bgd,
              text: "Hai vinto uno dei profumi di Aqve Romane",
              text2: "Congratulazioni hai vinto! Entra nel mondo di Aqve Romane con uno dei nostri premi, controlla la mail per riscattare il tuo premio.",
              img: Geles,
            });
            break;
          case "prize3":
            setVersion({
              cssClass: "version-1",
              bgd: Bgd,
              text: "Hai Vinto una body lotion di Aqve Romane",
              text2: "Congratulazioni hai vinto! Entra nel mondo di Aqve Romane con uno dei nostri premi, controlla la mail per riscattare il tuo premio.",
              img: Perfumes,
            });
            break;
          case "prize1":
            setVersion({
              cssClass: "version-2",
              bgd: Bgd2,
              text: "Hai vinto un weekend alle acque termali di Roma",
              text2: "Congratulazioni hai vinto! Entra nel mondo di Aqve Romane con uno dei nostri premi, controlla la mail per riscattare il tuo premio.",
            });
            break;
        }
      } else {
        console.error('Error al agregar participante', response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    fetchPrize(`http://localhost:3000/api/winners/${uniqueId}`);

    setTimeout(()=>{
      document.querySelector('.win-page').style.opacity = 1;
      document.querySelector('.win-page__card').style.opacity = 1;
      document.querySelector('.button').style.opacity = 1;
    }, 100)
  }, [uniqueId])

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
          <h1>HAI VINTO</h1>
          <h2>{version.text}</h2>
          <picture className="win-page__img">
            <img src={version.img} alt="Prize Image" />
          </picture>
          <p>{version.text2}</p>
          <span>Se vuoi contattarci puoi scrivere a <a href="mailto:info@laurabiagiottiparfums.com">info@laurabiagiottiparfums.com</a></span>
        </div>
      </div>
      <div className="button">
        <PlayBtn text={`Torna All'Inizio`} onClick={handlePlayClick} />
      </div>
    </div>
  );
}

export default WinPage;