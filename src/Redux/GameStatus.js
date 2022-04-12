import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game", 
  initialState: {
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
  }
})

export const { addToScore, decreaseLifepoints } = gameSlice.actions; 
export default gameSlice.reducer;