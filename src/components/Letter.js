import React from 'react'

const Letter = ( { letter } ) => {
  
  const letterStyle = {
    backgroundColor: letter.color,
    height: `${letter.size}px`,
    width: `${letter.size}px`,
    left: `${letter.positionX}%`,
    top: `${letter.positionY}px`,
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

export default Letter