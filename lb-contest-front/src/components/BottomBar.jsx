

import Draggable from 'react-draggable';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Img1 from '../assets/img/divinum-ficus.svg';
import Img2 from '../assets/img/uva-dulcis.svg';
import Img3 from '../assets/img/morron.svg';
import Img4 from '../assets/img/ambrosia-aurea.svg';
import Img5 from '../assets/img/hojas.svg';
import Img6 from '../assets/img/margarita.svg';
import Img7 from '../assets/img/miel.svg';
import Img8 from '../assets/img/lime.svg';
import Img9 from '../assets/img/pink-fluid.svg';

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
                history('/form');
              } else {
                history('/form');
              }
            },1200);
        }
    }, [allDraggableDisabled, history]);

    const onDrop = (e, element) => {
        element.node.style.cursor = 'grab'
    
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
    }

  return (
    <div className="bottom-bar">
      <ul className="bottom-bar__list">
        {[Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9].map((img, index) => (
          <Draggable key={index} /*nodeRef={ref}*/ onStop={onDrop} onStart={onDrag} onDrag={whileDrag} position={position}>
            <li ref={ref} className="bottom-bar__item" id={`Img${index + 1}`}>
              <div className="bottom-bar__picture" style={{ backgroundImage: `URL(${img})` }}></div>
            </li>
          </Draggable>
        ))}
      </ul>
    </div>
  );
}

export default BottomBar