import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Letter from './Letter';

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
          <Letter key={i} letter={letter.letter} positionX={letter.positionX} positionY={letter.positionY} size={letter.size} />
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

export default Game