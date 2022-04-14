import React from 'react'

const LostLetter = ( { letter } ) => {

  return (
    <>
      <div id='letter' data-letter={letter} style={ { top: '550px', left: letter.positionX + '%', padding: letter.size + 'px', background: 'grey' } }>
       { letter.letter }
      </div>
    </>
  )
}

export default LostLetter