const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    } else if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

let particlesArray;

function init() {
  particlesArray = [];
  const numberOfParticles = (canvas.width * canvas.height) / 7000;
  for (let i = 0; i < numberOfParticles; i++) {
    // [1,3[
    const size = Math.random() * 2 + 1;
    // return Math.random() * (max - min + 1) + min;
    const x = Math.random() * (innerWidth - 10 - 10 + 1) + 10;
    const y = Math.random() * (innerHeight - 10 - 10 + 1) + 10;

    const directionX = cleanDirection();
    const directionY = cleanDirection();
    particlesArray.push(new Particle(x, y, directionX, directionY, size, "#f1f1f1"));
  }
}

init();

function cleanDirection() {
  // 0 ou 1
  const random = Math.trunc(Math.random() * 2);
  if (random) {
    // de 0.5 à 1.5 non inclu, non trunc [0.5,1.5[
    return Math.random() * 1 + 0.5;
  } else {
    // de -0.5 à -1.5 non inclu, non trunc ]-1.5,-0.5]
    return Math.random() * -1 - 0.5;
  }
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  requestAnimationFrame(animate);
}
animate();
