var getRandomColor;

getRandomColor = function() {
  var color, i, letters;
  letters = '0123456789ABCDEF';
  color = '#';
  i = 0;
  while (i < 6) {
    color += letters[Math.floor(Math.random() * 16)];
    i++;
  }
  return color;
};
