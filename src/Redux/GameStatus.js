import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game", 
  initialState: {
    letters: [],
    lostLetters: [],
    score: 0, 
    lifepoints: 20, 
  },
  reducers: {

    addToScore: (state) => {
      state.score += 1;
    }, 

    decreaseLifepoints: (state) => {
      state.lifepoints -= 1;
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

      state.score += count;
      state.letters = state.letters.filter(letter => letter.letter !== action.payload)

    },

    lostLetters: (state, action) => {

      state.lifepoints -= 1;
      state.letters = state.letters.filter(letter => letter.id !== action.payload.id);
      state.lostLetters.push(action.payload);
      
    },

    StopGame: (state) => {
      state.letters = [];
    }
    
  }
})

export const { addToScore, decreaseLifepoints, addLetters, removeLetters, lostLetters, StopGame } = gameSlice.actions; 
export default gameSlice.reducer;