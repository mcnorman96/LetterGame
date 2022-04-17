export const COLORS = ['#EA4335', '#34A853', '#4285F4', '#FBBC05'];

export const SIZES = [25, 30, 35, 40, 45, 50];

export const LETTERS = ['a', 'b', 'c', 'd', 'e'];

export const SPAWN_RATE = [600, 650, 700, 750, 800, 850, 900, 950, 1000]

export const newLetter = () => {
  var result = {
    letter: LETTERS[Math.floor(Math.random() * LETTERS.length)], 
    positionX: Math.floor(Math.random() * 100 ), 
    positionY: Math.floor(Math.random() * 50),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: SIZES[Math.floor(Math.random() * SIZES.length)],
  }
  return result;
}
