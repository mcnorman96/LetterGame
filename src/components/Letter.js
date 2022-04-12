import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToScore, decreaseLifepoints } from '../Redux/GameStatus';

const Letter = ( { letter, positionX, positionY, size } ) => {
  const [position, setPosition] = useState(positionY);
  const score = useSelector(state => state.game.score);
  const [visible, setVisible] = useState(true);
  const [active, setactive] = useState(true);
  const dispatch = useDispatch();

  function moveDown() {
    setPosition(position + 1);
   }

  useEffect(() => {

    // If Letter is removed from game stop the position.
    if(!visible) return;

    if (position < 499){

      requestAnimationFrame(moveDown);

    } else {
      setactive(false);
      setPosition(550);

      dispatch(
        decreaseLifepoints()
      )

    }

  }, [position])

  useEffect(() => {
    var keydown = false;

    window.addEventListener('keydown', function(e) {
      if (!keydown) {
        keydown = true;

        if (e.key === letter && active && visible) {
          dispatch(addToScore())
          setVisible(false);
        }

      }
  
      window.addEventListener('keyup', function() {
        keydown = false;
      });

    });

  }, [active, visible])

  return (
    <>
      { visible && 
          <div id='letter' data-letter={letter} style={ { top: position + 'px', left: positionX + '%', padding: size + 'px', background: 'grey' } }>
          { letter }
        </div>
      }
    </>
  )
}

export default Letter