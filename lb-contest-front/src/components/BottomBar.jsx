

import Draggable from 'react-draggable';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Arrow from '../assets/img/Arrow.png';

import GamePopUp from './GamePopUp';

import Img1 from '../assets/img/Carciofo.png';
import Img2 from '../assets/img/Rosa.png';
import Img3 from '../assets/img/Peperone.png';
import Img4 from '../assets/img/Nespola.png';
import Img5 from '../assets/img/Alloro.png';
import Img6 from '../assets/img/Camomilla.png';
import Img7 from '../assets/img/Miele.png';
import Img8 from '../assets/img/Fico.png';
import Img9 from '../assets/img/Vino.png';

import Tick from '../assets/img/tick.svg';
import Cross from '../assets/img/cross.svg';

import '../assets/scss/components/BottomBar.scss';

function BottomBar({onDropAndUpdateScore, bottles, scoreBoard}) {
    // ref to avoid warning
    const ref = useRef(null);
    // set position for items
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // outter elements updater
    const [score, setScore] = useState(0);
    const [disableds, setDisableds] = useState(0);
    const [background, setBackground] = useState(null)

    // chack items use
    const [allDraggableDisabled, setAllDraggableDisabled] = useState(false);

    // items for transition
    const [ingredients, setIngredients] = useState([]);

    // navigation tool
    const history = useNavigate();

    // mobile scroll ingredient bar
    const ingredientsListRef = useRef(null);
    const [visibleIngredients, setVisibleIngredients] = useState(
      Array(9).fill(false)
    );
    
    function hideItems() {
      const slides = document.querySelectorAll('.bottom-bar__item-wrapper');
      const popup = document.querySelector('.pop-up');

      slides.forEach((slide, index) => {
        if (visibleIngredients[index]) {
          slide.classList.add('hide');
        } else {
          slide.classList.remove('hide');
        }
      });

      setTimeout(() => {
        popup.classList.add('show');

      }, 2000)
      
      setTimeout(() => {
        popup.style.opacity = 1;
      }, 2500)

      setTimeout(() => {
        popup.style.opacity = 0;
      }, 6000)

      setTimeout(() => {
        popup.classList.remove('show');
      }, 7000)
    }
    
    const scrollList = (direction, resize) => {
      const { current } = ingredientsListRef;
      if (current) {

        if (!resize) {
          let scrollAmount;
          const elemWidth = document.querySelector('.bottom-bar__item-wrapper').getBoundingClientRect().width;
  
          if (window.innerWidth <= 500) {
            scrollAmount = (-elemWidth * 4) - 45;
          } else if (window.innerWidth <= 680) {
            scrollAmount = (-elemWidth * 3) - 45;
          } else if (window.innerWidth <= 768) {
            scrollAmount = (-elemWidth * 3) - 10;
          }

          if (direction === -1) {
            current.style.translate = `${scrollAmount}px`;
            current.parentNode.classList.add('scrolled');
          } else {
            current.style.translate = "0px";
            current.parentNode.classList.remove('scrolled');
          }
        }

        let bounds = {
          start1: 0,
          end1: 0,
          start2: 0,
          end2: 0,
        }

        if (window.innerWidth <= 500) {
          bounds.start1 = 5;
          bounds.end1 = 9;
          bounds.start2 = 0;
          bounds.end2 = 4;
        } else if (window.innerWidth <= 768) {
          bounds.start1 = 6;
          bounds.end1 = 9;
          bounds.start2 = 0;
          bounds.end2 = 3;
        }

        if (direction === -1) {
          setVisibleIngredients(
            visibleIngredients.fill(false, bounds.start1, bounds.end1)
          )

          setVisibleIngredients(
            visibleIngredients.fill(true, bounds.start2, bounds.end2)
          )

          hideItems();
        } else {
          setVisibleIngredients(
            visibleIngredients.fill(false, bounds.start2, bounds.end2)
          )

          setVisibleIngredients(
            visibleIngredients.fill(true, bounds.start1, bounds.end1)
          )

          hideItems();
        }
      }
    };
    
    // object to check scores
    let isScore = {
      Img1: false,
      Img2: false,
      Img3: false,
      Img4: false,
      Img5: false,
      Img6: false,
      Img7: false,
      Img8: false,
      Img9: false
    }

    // 
    useEffect(() => {
      const ingredientes = document.querySelectorAll('.bottom-bar__picture');
      setIngredients(ingredientes);
      const background = document.querySelector('.game');
      setBackground(background);
      
      if (window.innerWidth <= 500) {
        setVisibleIngredients(
          visibleIngredients.fill(true, 5, 9)
        )
      } else if (window.innerWidth <= 768) {
        setVisibleIngredients(
          visibleIngredients.fill(true, 6, 9)
        )
      }

      window.addEventListener('resize', (e) => {
        const vw = e.target.outerWidth;

        if (vw <= 500) {
          setVisibleIngredients(
            visibleIngredients.fill(false, 0, 4)
          )

          setVisibleIngredients(
            visibleIngredients.fill(true, 5, 9)
          )
        } else if (vw <= 768) {
          setVisibleIngredients(
            visibleIngredients.fill(false, 0, 6)
          )

          setVisibleIngredients(
            visibleIngredients.fill(true, 6, 9)
          )
        } else if (vw == 768 || vw > 768) {
          console.log(true)
          setVisibleIngredients(
            visibleIngredients.fill(false, 0, 9)
          )
        }

        hideItems();
        scrollList(1, false);
      })
      
      hideItems();
    }, []);
      
      // check items use
      useEffect(() => {
        checkAllDraggableDisabled(disableds);
    }, [disableds]);

    // callback
    const checkAllDraggableDisabled = (disableds) => {
        let allDisabled = false;
        if (disableds >= 9) {
            allDisabled = true;
        }

        setAllDraggableDisabled(allDisabled);
    };

    // entrance animation
    useEffect(() => {
        setTimeout(() => {
            ingredients.forEach((item , index) => {
                setTimeout(() => {
                    item.style.opacity = `1`;
                }, (index*100) + 400);
            })
        }, 1000);

    },[ingredients])


    // redirection via navigation tool
    useEffect(() => {
        if (allDraggableDisabled) {
            bottles.forEach((bottle) => {
                bottle.style.transition = `.5s .5s`;
                bottle.style.opacity = 0;
            })

            document.querySelector('.bottom-bar').style.transition = `.3s .3s`;
            document.querySelector('.bottom-bar').style.opacity = 0;
            scoreBoard.style.transition = `.3s .6s`;
            scoreBoard.style.opacity = 0;
            background.style.transition = `.3s .9s`;
            background.style.opacity = 0;

            setTimeout(() => {
              if (score >= 6) {
                history('/contest-form');
              } else {
                history('/form');
              }
            },1200);
        }
    }, [allDraggableDisabled, history]);

    const onDrop = (e, element) => {
        element.node.style.cursor = 'grab';
        element.node.style.zIndex = 999999;

        const elementWrapper = element.node.parentNode;
        const tick = elementWrapper.querySelector('.tick');
        const cross = elementWrapper.querySelector('.cross')
    
        let droppedElementRect = {
          left: element.node.getBoundingClientRect().x,
          top: element.node.getBoundingClientRect().y,
          width: element.node.getBoundingClientRect().width,
          height: element.node.getBoundingClientRect().height
        };
    
        bottles.forEach((bottle) => {
          const bottleRect = bottle.getBoundingClientRect();
          const id = bottle.getAttribute('id');
          if (
            (droppedElementRect.left + (droppedElementRect.width / 2)) >= bottleRect.left &&
            (droppedElementRect.top + (droppedElementRect.height / 2)) >= bottleRect.top &&
            (droppedElementRect.left + (droppedElementRect.width / 2)) <= bottleRect.right &&
            (droppedElementRect.top + (droppedElementRect.height / 2)) <= bottleRect.bottom
          ) {
            switch (element.node.id) {
              case 'Img1':
                isScore.Img1 = true;
                break;
              case 'Img2':
                isScore.Img2 = true;
                break;
              case 'Img3':
                isScore.Img3 = true;
                break;
              case 'Img4':
                isScore.Img4 = true;
                break;
              case 'Img5':
                isScore.Img5 = true;
                break;
              case 'Img6':
                isScore.Img6 = true;
                break;
              case 'Img7':
                isScore.Img7 = true;
                break;
              case 'Img8':
                isScore.Img8 = true;
                break;
              case 'Img9':
                isScore.Img9 = true;
                break;
            }
    
            switch (id) {
              case 'bottle-1':
                if (element.node.id == 'Img1' || element.node.id == 'Img5' || element.node.id == 'Img8') {
                  setScore(score + 1);
                  onDropAndUpdateScore(score);
                  bottle.querySelector('.right').style.transition = 'opacity .3s, transform .5s';
                  bottle.querySelector('.right').style.opacity = 1;
                  bottle.querySelector('.right').style.transform = 'translate(0px, 0px)';

                  tick.style.opacity = "1";

                  setTimeout(() => {
                    bottle.querySelector('.right').style.transition = 'opacity .3s, transform .1s .3s';
                    bottle.querySelector('.right').style.opacity = 0;
                    bottle.querySelector('.right').style.transform = 'translate(0px, 40px)';
                  }, 500);
                } else {
                  bottle.querySelector('.wrong').style.transition = 'opacity .3s, transform .5s';
                  bottle.querySelector('.wrong').style.opacity = 1;
                  bottle.querySelector('.wrong').style.transform = 'translate(0px, 0px)';

                  cross.style.opacity = "1";

                  setTimeout(() => {
                    bottle.querySelector('.wrong').style.transition = 'opacity .3s, transform .1s .3s';
                    bottle.querySelector('.wrong').style.opacity = 0;
                    bottle.querySelector('.wrong').style.transform = 'translate(0px, 40px)';
                  }, 500);
                }
              break;
              case 'bottle-2':
                if (element.node.id == 'Img4' || element.node.id == 'Img6' || element.node.id == 'Img7') {
                  setScore(score + 1);
                  onDropAndUpdateScore(score);
                  bottle.querySelector('.right').style.transition = 'opacity .3s, transform .5s';
                  bottle.querySelector('.right').style.opacity = 1;
                  bottle.querySelector('.right').style.transform = 'translate(0px, 0px)';

                  tick.style.opacity = "1";

                  setTimeout(() => {
                    bottle.querySelector('.right').style.transition = 'opacity .3s, transform .1s .3s';
                    bottle.querySelector('.right').style.opacity = 0;
                    bottle.querySelector('.right').style.transform = 'translate(0px, 40px)';
                  }, 500);
                } else {
                  bottle.querySelector('.wrong').style.transition = 'opacity .3s, transform .5s';
                  bottle.querySelector('.wrong').style.opacity = 1;
                  bottle.querySelector('.wrong').style.transform = 'translate(0px, 0px)';

                  cross.style.opacity = "1";

                  setTimeout(() => {
                    bottle.querySelector('.wrong').style.transition = 'opacity .3s, transform .1s .3s';
                    bottle.querySelector('.wrong').style.opacity = 0;
                    bottle.querySelector('.wrong').style.transform = 'translate(0px, 40px)';
                  }, 500);
                }
              break;
              case 'bottle-3':
                if (element.node.id == 'Img2' || element.node.id == 'Img3' || element.node.id == 'Img9') {
                  setScore(score + 1);
                  onDropAndUpdateScore(score);
                  bottle.querySelector('.right').style.transition = 'opacity .3s, transform .5s';
                  bottle.querySelector('.right').style.opacity = 1;
                  bottle.querySelector('.right').style.transform = 'translate(0px, 0px)';

                  tick.style.opacity = "1";

                  setTimeout(() => {
                    bottle.querySelector('.right').style.transition = 'opacity .3s, transform .1s .3s';
                    bottle.querySelector('.right').style.opacity = 0;
                    bottle.querySelector('.right').style.transform = 'translate(0px, 40px)';
                  }, 500);
                } else {
                  bottle.querySelector('.wrong').style.transition = 'opacity .3s, transform .5s';
                  bottle.querySelector('.wrong').style.opacity = 1;
                  bottle.querySelector('.wrong').style.transform = 'translate(0px, 0px)';

                  cross.style.opacity = "1";

                  setTimeout(() => {
                    bottle.querySelector('.wrong').style.transition = 'opacity .3s, transform .1s .3s';
                    bottle.querySelector('.wrong').style.opacity = 0;
                    bottle.querySelector('.wrong').style.transform = 'translate(0px, 40px)';
                  }, 500);
                }
              break;
            }

            setDisableds(disableds + 1);
    
            element.node.style.transition = 'none';
            element.node.style.opacity = '0.5';
            element.node.style.pointerEvents = 'none';
            bottle.style.filter = `none`;
          } else {
            element.node.style.transition = 'transform 0.2s ease';
            element.node.style.transform = `none`;
      
            setPosition({ x: 0, y: 0 });
          }
        });
    }

    const whileDrag = (e, element) => {

        bottles.forEach(bottle => {
          const bottleRect = bottle.getBoundingClientRect();
          let droppedElementRect = {
            left: element.node.getBoundingClientRect().x,
            top: element.node.getBoundingClientRect().y,
            width: element.node.getBoundingClientRect().width,
            height: element.node.getBoundingClientRect().height
          };
          console.log(bottleRect)
  
          if (
            (droppedElementRect.left + (droppedElementRect.width / 2)) >= bottleRect.left &&
            (droppedElementRect.top + (droppedElementRect.height / 2)) >= bottleRect.top &&
            (droppedElementRect.left + (droppedElementRect.width / 2)) <= bottleRect.right &&
            (droppedElementRect.top + (droppedElementRect.height / 2)) <= bottleRect.bottom
          ) {
            bottle.style.transition = `.2s`;
            bottle.style.filter = `drop-shadow(0px 0px 6px grey)`;
          } else {
            bottle.style.filter = `none`;
          }
        });
  
    };
  
    const onDrag = (e, element) => {
        element.node.style.cursor = 'grabbing';
        element.node.style.transition = 'none';
        element.node.style.zIndex = 999999;
    }

  return (
    <div className="bottom-bar">
      <div className="bottom-bar__wrapper">
        <GamePopUp message={`Trascina un elemento per abbinarlo all'essenza`} />
        <div className="bottom-bar__arrow left" onClick={() => scrollList(1)}><img src={Arrow} alt="Left Arrow" /></div>
        <ul className="bottom-bar__list" ref={ingredientsListRef}>
          {[Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9].map((img, index) => (
            <div className={`bottom-bar__item-wrapper`} key={index} data-index={index} /*style={{ opacity: visibleIngredients[index] ? 1 : 0 }}*/>
              <picture className="bottom-bar__icon tick">
                <img src={Tick} alt="Tick" />
              </picture>
              <picture className="bottom-bar__icon cross">
                <img src={Cross} alt="Cross" />
              </picture>
              <Draggable onStop={onDrop} onStart={onDrag} onDrag={whileDrag} position={position}>
                <li ref={ref} className="bottom-bar__item" id={`Img${index + 1}`}>
                  <div className="bottom-bar__picture" style={{ backgroundImage: `URL(${img})` }}></div>
                </li>
              </Draggable>
            </div>
          ))}
        </ul>
        <div className="bottom-bar__arrow right" onClick={() => scrollList(-1)}><img src={Arrow} alt="Right Arrow" /></div>
      </div>
    </div>
  );
}

export default BottomBar