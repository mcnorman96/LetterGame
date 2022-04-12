import { render } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToScore, decreaseLifepoints } from '../Redux/GameStatus';

const Game = () => {
  const score = useSelector(state => state.game.score);
  const lifepoints = useSelector(state => state.game.lifepoints);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    function makeLetter(length) {
      var characters       = 'abcde';
      var charactersLength = characters.length;
      var items = [];

      for ( var i = 0; i < length; i++ ) {
        var result = {
          letter: characters.charAt(Math.floor(Math.random() * charactersLength)), 
          positionX: (Math.random() * 100), 
          positionY: (Math.random() * 50),
          size: (Math.random() * 10),
        }
        items.push(result);
      }

      setLetters(
        letters => [...letters, ...items]
       );

    }
    makeLetter(15);
  }, []);




  return (
    <div className='game'>
      <div className='board' id='board'>
        { letters.map((letter, i) => (
          <LetterComponent key={i} letter={letter.letter} positionX={letter.positionX} positionY={letter.positionY} size={letter.size} />
        ))}
          <div className='active-board'></div>
          <div className='disabled-board'></div>
        </div>
        <div className='table'>
          <div className='score'>
            <h3>Score</h3>
            { score }
          </div>
          <div className='lifepoints'>
            <h3>Lifepoints</h3>
            { lifepoints }
          </div>
        </div>
    </div>
  )
}

const LetterComponent = ( { letter, positionX, positionY, size } ) => {
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
          <div id='letter' data-letter={letter} style={ { top: position + 'px', left: positionX + '%', padding: size + 'px',        background: 'grey' } }>
          { letter }
        </div>
      }
    </>
  )
}

export default Game