import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react'

const Game = () => {
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    function makeLetter(length) {
      var characters       = 'ABCDE';
      var charactersLength = characters.length;
  
      for ( var i = 0; i < length; i++ ) {
        var result = {
          letter: characters.charAt(Math.floor(Math.random() * charactersLength)), 
          positionX: (Math.random() * 100), 
          positionY: (Math.random() * 50),
          size: (Math.random() * 10),
        }
        setLetters(
         [...letters, result]
        );
      }
    }
    makeLetter(1);
  }, []);

  console.log(letters);


  setTimeout(() => {
    var letter = document.getElementById('letter');

    // With requestAnimationFramet // my super favorite
    var top = 0;
    function moveDown() {
        top++;
        letter.style.top = top + 'px';
        if (top < 499){
            requestAnimationFrame(moveDown);
        }
    }
    requestAnimationFrame(moveDown);
  }, 50);
  
  return (
    <div className='game'>
      <div className='board' id='board'>
        { letters.map((letter, i) => (
          <LetterComponent key={i} letter={letter.letter} positionX={letter.positionX} positionY={letter.positionY} size={letter.size} />
        ))}
          <div className='active-board'>

          </div>
          <div className='disabled-board'>

          </div>
        </div>
        <div className='score'>
          score
          { score }
        </div>
    </div>
  )
}

const LetterComponent = ({letter, positionX, positionY, size}) => {
  
  return (
    <div id='letter' data-letter={letter} style={ { top: positionY, left: positionX + '%', padding: size + 'px', background: 'grey' } }>
      { letter }
    </div>
  )
}

export default Game