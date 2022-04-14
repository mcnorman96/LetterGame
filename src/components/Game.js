import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addLetters, removeLetters, StopGame } from '../Redux/GameStatus';
import Letter from './Letter';
import LostLetter from './LostLetter';

const Game = () => {
  const score = useSelector(state => state.game.score);
  const lifepoints = useSelector(state => state.game.lifepoints);
  const letters = useSelector(state => state.game.letters);
  const lostLetters = useSelector(state => state.game.lostLetters);
  const dispatch = useDispatch();
  var makeLetters;
  var letterIndex = 1;

  useEffect(() => {
    
    function makeLetter(length) {
      var characters       = 'abcde';
      var charactersLength = characters.length;

      for ( var i = 0; i < length; i++ ) {
        var result = {
          id: letterIndex,
          letter: characters.charAt(Math.floor(Math.random() * charactersLength)), 
          positionX: (Math.random() * 100), 
          positionY: Math.round((Math.random() * 50)),
          size: (Math.random() * 10),
        }
        dispatch(
          addLetters({...result })
        );
        letterIndex++;
      }
    }

    makeLetters = setInterval(function(){
      makeLetter(5);
    }, 2000);
  }, []);

  useEffect(() => {
    if (lifepoints === 0) {
      alert('gameover');
      clearInterval(2); 
      dispatch(StopGame());
    }
  }, [lifepoints]);

  useEffect(() => {
    var keydown = false;

    window.addEventListener('keydown', function(e) {
      if (!keydown) {
        keydown = true;
        dispatch(removeLetters(e.key));
      }
      window.addEventListener('keyup', function() {
        keydown = false;
      });
    });

  }, [])

  return (
    <div className='game'>
      <div className='board' id='board'>
        <div className='active-board'>
          { letters?.map((letter, i) => (
          <Letter key={i} letter={letter} />
          ))}
        </div>
        <div className='disabled-board'>
          { lostLetters?.map((letter, i) => (
          <LostLetter key={i} letter={letter} />
        ))}
        </div>
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