import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { lostLetters } from '../Redux/GameStatus';

const Letter = ( { letter } ) => {
  const [position, setPosition] = useState(letter.positionY);
  const dispatch = useDispatch();

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

    } else {

      requestAnimationFrame(moveDown);

    }

  })
  
  return (
    <>
          <div id='letter' style={ { top: position + 'px', left: letter.positionX + '%', padding: letter.size + 'px', background: 'grey' } }>
          { letter.letter }
        </div>
  
    </>
  )
}

export default Letter