function getRandomNum(min = 1, max = 4) { 
  // Максимум и минимум включаются
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

export default getRandomNum;