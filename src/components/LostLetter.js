import React from 'react'

const LostLetter = ( { letter } ) => {
  const letterStyle = {
    backgroundColor: letter.color,
    height: `${letter.size}px`,
    width: `${letter.size}px`,
    left: `${letter.positionX}%`,
    top: `unset`,
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(-50%)', 
    textTransform: 'uppercase',
  };
  
  return (
    <div id='letter' style={ letterStyle }>
      { letter.letter }
    </div>
  )
}

export default LostLetter