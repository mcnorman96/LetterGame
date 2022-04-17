import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addLetters, pauseGame, removeLetters, updateLetters } from '../Redux/GameStatus';
import { newLetter, SPAWN_RATE } from './Letterlogic';
import Letter from './Letter';
import LostLetter from './LostLetter';

const Game = () => {
  const score = useSelector( state => state.game.score );
  const lifepoints = useSelector( state => state.game.lifepoints );
  const letters = useSelector( state => state.game.letters );
  const lostLetters = useSelector( state => state.game.lostLetters );
  const GameStatus = useSelector( state => state.game.isPlaying );
  const GameSpeed = useSelector( state => state.game.speed );
  const dispatch = useDispatch();
  const requestRef = useRef();
  const intervalRef = useRef();

  const handlePause = useCallback(()=> {
    dispatch(
      pauseGame()
    );
    requestRef.current && cancelAnimationFrame(requestRef.current);
  }, [dispatch]);

  const makeLetter = useCallback(() => {

      dispatch(
        addLetters({ ...newLetter() })
      );

      intervalRef.current && clearInterval(intervalRef.current);
      intervalRef.current = setInterval(makeLetter, randRange(SPAWN_RATE) * GameSpeed/100);

  }, [dispatch, GameSpeed]);

  const randRange = useCallback((data) => {
    var newTime = data[Math.floor(data.length * Math.random())];
    return newTime;
  })

  const UpdateLetterPosition = useCallback(() => {
    dispatch(
      updateLetters()
    )
    requestRef.current = requestAnimationFrame(UpdateLetterPosition);
  }, [dispatch]); 

  useEffect(() => {

    if (GameStatus) {
      intervalRef.current = setInterval(makeLetter, randRange(SPAWN_RATE));
      requestRef.current = requestAnimationFrame(UpdateLetterPosition);
    } else {
      intervalRef.current && clearInterval(intervalRef.current);
      requestRef.current && cancelAnimationFrame(requestRef.current);
    }
    
  }, [makeLetter, GameStatus, UpdateLetterPosition])

  useEffect(() => {
    if (lifepoints === 0) {
      intervalRef.current && clearInterval(intervalRef.current);
      requestRef.current && cancelAnimationFrame(requestRef.current);
      alert('Gameover');
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
  }, [GameStatus, dispatch])

  return (
    <div className='game'>
      <div className='board' id='board' ref={requestRef}>
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
          <div className='gamecontrols'>
            <button className={GameStatus ? 'Pause' : 'Play'} onClick={handlePause}>
            {
              GameStatus ? 'Pause' : 'Play' 
            }
            </button>
          </div>
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