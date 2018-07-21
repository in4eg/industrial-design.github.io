var alphaOffset, angle, baseAlpha, baseRadius, canvas, centerX, centerY, ctx, height, offset, radOffset, render, setCanvasSize, speed, width;

(function() {
  var requestAnimationFrame;
  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

canvas = document.getElementById('canvas');

width = 0;

height = 0;

(setCanvasSize = function() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
})();

ctx = canvas.getContext('2d');

centerY = height * .5;

centerX = width * .5;

baseRadius = 100;

baseAlpha = 0.5;

radOffset = 50;

alphaOffset = 0.5;

offset = height * .4;

speed = 0.055;

angle = 0;

render = function() {
  var alpha, radius, y;
  y = centerY + Math.sin(angle) * offset;
  radius = baseRadius + Math.sin(angle) * radOffset;
  alpha = baseAlpha + Math.sin(angle) * alphaOffset;
  ctx.fillStyle = 'rgba(255, 255, 255,' + alpha + ')';
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.arc(centerX, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
  angle += speed;
  requestAnimationFrame(render);
};

render();

window.addEventListener('resize', function() {
  setCanvasSize();
});
