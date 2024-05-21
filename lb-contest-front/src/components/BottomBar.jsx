

import Draggable from 'react-draggable';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Arrow from '../assets/img/Arrow.png';

import Img1 from '../assets/img/Carciofo.png';
import Img2 from '../assets/img/Rosa.png';
import Img3 from '../assets/img/Peperone.png';
import Img4 from '../assets/img/Nespola.png';
import Img5 from '../assets/img/Alloro.png';
import Img6 from '../assets/img/Camomilla.png';
import Img7 from '../assets/img/Miele.png';
import Img8 from '../assets/img/Fico.png';
import Img9 from '../assets/img/Vino.png';

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
      Array(9).fill(true)
    );
    const [isTranslated, setIsTranslated] = useState([false]);
  
    useEffect(() => {
      // console.log(visibleIngredients)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = entry.target.getAttribute('data-index');
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              setVisibleIngredients((prevState) => {
                const newState = [...prevState];
                newState[index] = true;
                return newState;
              });
            } else {
              entry.target.style.opacity = "0";
              setVisibleIngredients((prevState) => {
                const newState = [...prevState];
                newState[index] = false;
                return newState;
              });
            }
          });
        },
        {
          root: ingredientsListRef.current,
          threshold: 0.1,
        }
      );
  
      const items = document.querySelectorAll('.bottom-bar__item-wrapper');
      items.forEach((item) => observer.observe(item));
  
      return () => observer.disconnect();
    }, [isTranslated, visibleIngredients]);

    const scrollList = (direction) => {
      const { current } = ingredientsListRef;
      if (current) {
        const scrollAmount = direction * current.offsetWidth / 2;
        current.style.translate = direction === -1 ? `${scrollAmount}px` : "0px";
        setIsTranslated(!isTranslated);
        console.log(isTranslated)
        /*
        current.style.overflow = "hidden";

        setTimeout(() => {
          current.style.overflow = "initial";
        }, 500);
        */
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
    
        let droppedElementRect = {
          left: element.node.getBoundingClientRect().x,
          top: element.node.getBoundingClientRect().y
        };
    
        bottles.forEach((bottle) => {
          const bottleRect = bottle.getBoundingClientRect();
          const id = bottle.getAttribute('id');
          console.log(bottleRect.bottom + 40)
          if (
            droppedElementRect.left >= bottleRect.left &&
            droppedElementRect.top >= bottleRect.top &&
            droppedElementRect.left <= bottleRect.right &&
            droppedElementRect.top <= bottleRect.bottom - 200
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

                  setTimeout(() => {
                    bottle.querySelector('.right').style.transition = 'opacity .3s, transform .1s .3s';
                    bottle.querySelector('.right').style.opacity = 0;
                    bottle.querySelector('.right').style.transform = 'translate(0px, 40px)';
                  }, 500);
                } else {
                  bottle.querySelector('.wrong').style.transition = 'opacity .3s, transform .5s';
                  bottle.querySelector('.wrong').style.opacity = 1;
                  bottle.querySelector('.wrong').style.transform = 'translate(0px, 0px)';

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

                  setTimeout(() => {
                    bottle.querySelector('.right').style.transition = 'opacity .3s, transform .1s .3s';
                    bottle.querySelector('.right').style.opacity = 0;
                    bottle.querySelector('.right').style.transform = 'translate(0px, 40px)';
                  }, 500);
                } else {
                  bottle.querySelector('.wrong').style.transition = 'opacity .3s, transform .5s';
                  bottle.querySelector('.wrong').style.opacity = 1;
                  bottle.querySelector('.wrong').style.transform = 'translate(0px, 0px)';

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

                  setTimeout(() => {
                    bottle.querySelector('.right').style.transition = 'opacity .3s, transform .1s .3s';
                    bottle.querySelector('.right').style.opacity = 0;
                    bottle.querySelector('.right').style.transform = 'translate(0px, 40px)';
                  }, 500);
                } else {
                  bottle.querySelector('.wrong').style.transition = 'opacity .3s, transform .5s';
                  bottle.querySelector('.wrong').style.opacity = 1;
                  bottle.querySelector('.wrong').style.transform = 'translate(0px, 0px)';

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
            top: element.node.getBoundingClientRect().y
          };
  
          if (
            droppedElementRect.left >= bottleRect.left &&
            droppedElementRect.top >= bottleRect.top &&
            droppedElementRect.left <= bottleRect.right &&
            droppedElementRect.top <= bottleRect.bottom -200
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
        console.log(element);
    }

  return (
    <div className="bottom-bar">
      <div className="bottom-bar__wrapper">
        <div className="bottom-bar__arrow left" onClick={() => scrollList(1)}><img src={Arrow} alt="Left Arrow" /></div>
        <ul className="bottom-bar__list" ref={ingredientsListRef}>
          {[Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9].map((img, index) => (
            <div className="bottom-bar__item-wrapper" key={index} data-index={index} /*style={{ opacity: visibleIngredients[index] ? 1 : 0 }}*/>
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