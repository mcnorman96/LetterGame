import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game", 
  initialState: {
    letters: [],
    lostLetters: [],
    score: 0, 
    lifepoints: 20, 
    isPlaying: true, 
    spawnRate: 1000,
  },
  reducers: {

    addToScore: (state) => {
      state.score += 1;
    }, 

    addLetters: (state, action) => {
  
      state.letters.push(action.payload);
    
    }, 

    removeLetters: (state, action) => {
      
      const count = state.letters.filter(obj => {
        if (obj.letter === action.payload) {
          return true;
        }
        return false;
      }).length;

      if (count > 1 && state.isPlaying) {
        state.score += count;
        state.letters = state.letters.filter(letter => letter.letter !== action.payload)
      }

    },

    updateLetters: ( state ) => {
      const lostLetters = [];
      const newLetters = [];

      for (let letter of state.letters) {
          const newY = letter.positionY + 10 * 5 / 60;
          if (newY + letter.size <= 455) {
              newLetters.push(
                  {
                      ...letter,
                      positionY: newY,
                  }
              );
          } else {
            lostLetters.push(
              {
                  ...letter
              }
            );
            state.lifepoints -= 1;
          }
      }
      state.letters = newLetters;
      state.lostLetters = [...state.lostLetters, ...lostLetters];
    }, 

    StopGame: (state) => {
      state.letters = [];
    },

    pauseGame: (state) => {
      if (state.isPlaying) {
        state.isPlaying = false;
      } else {
        state.isPlaying = true;
      }
    }

  }
})

export const { addToScore, decreaseLifepoints, addLetters, removeLetters, lostLetters, updateLetters, StopGame, pauseGame } = gameSlice.actions; 
export default gameSlice.reducer;