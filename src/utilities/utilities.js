// GENERATE UNIQUE ID METHOD
// Creates a unique string for ID's of specified length (default: 8 characters)
// From https://www.fiznool.com/blog/2014/11/16/short-id-generation-in-javascript/
export const generateId = (size = 8) => {
  let ALPHABET = '23456789abdegjkmnpqrvwxyz';
  let newId = '';
  for (let i = 0; i < size; i++) {
    newId += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return newId;
};


// ES6 DURSTENFELD ARRAY SHUFFLE METHOD
// Receives an array and returns a new array with the elements shuffled
// From somewhere on Stack Overflow
export function shuffleArray(oldArray) {
  let newArray = oldArray;
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  };
  return newArray;
};


// GENERATE RANDOM INT FROM RANGE METHOD
// Generates a random integer from min (inclusive) to max (inlcusive)
// From https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range#1527820
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


// NORMALIZE STRINGS AND REMOVE DIATRICAL MARKS (ACCENTS) METHOD
// Removes accents from a string
// From https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
};