const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.backgroundColor = "transparent";

const ctx = canvas.getContext("2d");

const gold = "#D9A74A";

function Circle(radius) {
  this.radius = radius;
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius);
  };
}

const numberOfLines = 20;
function LineTop(startX, startY) {
  this.startX = startX;
  this.startY = startY;
  this.endY = 0;
  this.endX = startX;
  this.glowEffect = 0.2;

  this.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = gold;
    ctx.lineWidth = this.glowEffect;
    ctx.moveTo(this.startX, 0);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  };

  this.update = function () {
    this.draw();

    this.endX += Math.sqrt(this.startX * 2) / 1;
    this.endY += Math.sqrt(this.startX * 2) / 1;
  };

  this.glow = function () {
    this.draw();
    console.log(this.glowEffect);
  };
}

function LineSide(startY) {
  this.startY = startY;
  this.endY = startY;
  this.endX = 0;
  this.glowEffect = 0.2;

  this.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = gold;
    ctx.lineWidth = this.glowEffect;
    ctx.moveTo(0, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  };

  this.update = function () {
    this.draw();

    this.endX += Math.sqrt(this.startY * 2) / 1;
    this.endY += Math.sqrt(this.startY * 2) / 1;
  };

  this.glow = function () {
    this.draw();
    console.log(this.glowEffect);
  };
}

const lineArray1 = [];
const lineArray2 = [];

for (let i = 0; i < numberOfLines; i++) {
  let line = new LineTop((i * canvas.width) / numberOfLines);
  let line2 = new LineSide((i * canvas.height) / numberOfLines);

  lineArray1.push(line);
  lineArray2.push(line2);
}

function animate() {
  if (lineArray1[0].endY < canvas.height) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lineArray1.forEach((line) => {
      line.update();
    });
  }
  if (lineArray2[lineArray2.length].endY < canvas.height) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lineArray2.forEach((line) => {
      line.update();
    });
  } else {
    lineArray1.forEach((line) => {
      line.draw();
    });
    lineArray2.forEach((line) => {
      line.draw();
    });
  }
}

// function init() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   lineArray.forEach((line) => {
//     line.draw();
//   });
//   console.log("resize");
// }

// window.addEventListener("resize", init);
animate();
