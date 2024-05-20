import Logo from '../assets/img/logo.svg'
import Prize1 from '../assets/img/prizes-1.png'
import Prize2 from '../assets/img/prizes-2.png'
import Prize3 from '../assets/img/prizes-3.png'
import Bgd from '../assets/img/main-bgd.png'
import PlayBtn from './buttons/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import '../assets/scss/components/StartPage.scss';

/*
import { register } from 'swiper/element/bundle';
register();
*/


// Componente que muestra la imagen de fondo y el botón de play

function StartPage() {
    const estiloDelDiv = {
        backgroundImage: `url(${Bgd})`,
    };

    const prizes = [ Prize1, Prize2, Prize3 ];
    const [slides, setSlides] = useState({
      slidesPerView: 3,
      initialSlide: 0,
      spaceBetween: 30,
      pagination: false
    })
    const navigate = useNavigate()

    useEffect(() => {
      if (window.innerWidth <= 768) {
        setSlides({ slidesPerView: 1, initialSlide: 2, pagination: true, spaceBetween: 0 })
      }

      setTimeout(()=>{
        document.querySelector('.start-page__logo').style.transform = `translate(0px, 0px)`;
        document.querySelector('.button').style.transform = `translate(0px, 0px)`;
        document.querySelector('.start-page').style.opacity = 1;
        document.querySelector('.start-page__logo').style.opacity = 1;
        document.querySelector('.button').style.opacity = 1;
      }, 100)
    }, [])

    const handlePlayClick = () => {
      document.querySelector('.start-page__logo').style.opacity = 0;
      document.querySelector('.start-page').style.opacity = 0;
      document.querySelector('.button').style.opacity = 0;
      
      setTimeout(() => {
        navigate('/play')
      }, 200);
    };

  return (
    <div className="start-page" style={estiloDelDiv}>

      <div className="start-page__main">
        <div className="start-page__main-wrapper">
            <picture className="start-page__logo">
                <img src={Logo} alt="Laura Biaggioti Logo" />
            </picture>
            <div className="start-page__grid">
              <Swiper className="mySwiper" spaceBetween={slides.spaceBetween} pagination={true} modules={[Pagination]}>
                
                {/* <swiper-container
                  space-between={slides.spaceBetween} 
                  slides-per-view={slides.slidesPerView} 
                  pagination={slides.pagination}
                > */}
                { prizes.map((prize, index) => (
                  <SwiperSlide key={index}>
                    <picture className="start-page__prize">
                        <img src={prize} alt="Laura Biaggioti Contest Reward" />
                    </picture>
                  </SwiperSlide>
                )
                )}
              {/* </swiper-container> */}
              </Swiper>
            </div>
            <div className="start-page__text">{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque gravida leo, fringilla varius velit ornare id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam lacinia mauris nec metus porttitor sagittis.'}</div>
        </div>
        </div>
      <div className="button">
        <PlayBtn text={'Continua'} onClick={handlePlayClick} />
      </div>
    </div>
  );
}

export default StartPage;