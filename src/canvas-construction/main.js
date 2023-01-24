const canvas = document.querySelector(".canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let alpha = 0.5;

const gray = "gray";
const black = "black";
const green = `hsla(150, 100%, 80%, ${alpha})`;

const colors = [gray, black, green];
let index = 2;

let color = colors[index];

function Arc(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.start = 0;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.start, Math.PI / 2, false);
  };
}

function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.start = 0;
  this.radius = radius;
  this.dr = 0;
  this.color = color;

  this.draw = function () {
    ctx.beginPath();

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, this.start, Math.PI * this.dr, false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.stroke();
    ctx.closePath();

    ctx.fill();
  };

  this.update = function () {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // ctx.translate(this.x, this.y);
    // ctx.rotate(Math.PI / 100);
    // ctx.translate(-this.x, -this.y);
    this.draw();
    alpha += 0.007;

    if (this.dr >= 2) {
      this.dr = 0;
      alpha = 0;
      index += 1;
    }
    this.dr += 0.002;
    this.start += 0.002;
  };
}

const circle1 = new Circle(innerWidth / 2, innerHeight / 2, 200, color);

function animate() {
  requestAnimationFrame(animate);
  circle1.update();
}

function init() {
  animate();
  color = colors[index];
}

init();

window.addEventListener("resize", init());
