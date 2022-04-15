import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { lostLetters } from '../Redux/GameStatus';

const Letter = ( { letter } ) => {
  const [position, setPosition] = useState(letter.positionY);
  const dispatch = useDispatch();
  var checkUpdate = true; 

  function moveDown() {
    setPosition(
      position + 1
    );
   }

  useEffect(() => {

    if (position === 490) {
      
      dispatch( 
        lostLetters({...letter}) 
      )
      checkUpdate = false;

    } else {

      requestAnimationFrame(moveDown);

    }

  }, [position])
  
  return (
    <>
          <div id='letter' style={ { top: position + 'px', left: letter.positionX + '%', padding: letter.size + 'px', background: 'grey' } }>
          { letter.letter }
        </div>
  
    </>
  )
}

export default Letter