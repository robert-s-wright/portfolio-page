const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.backgroundColor = "transparent";

const ctx = canvas.getContext("2d");

centerX = canvas.width / 2;
centerY = canvas.height / 2;

const gold = "#D9A74A";

const goldTransparent = "#91733B";

const background = "#262625";

const lineWidth = 0.5;

const arcLineWidth = 1.5;

const color = goldTransparent;

function FilledArc(origin, width, startAngle) {
  this.origin = [...origin];
  this.width = width;
  this.angle = (startAngle * Math.PI) / 180;

  this.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = background;
    ctx.fillStyle = goldTransparent;
    ctx.lineWidth = arcLineWidth;

    ctx.arc(
      this.origin[0] - this.width / 2,
      this.origin[1],
      this.width,
      this.angle,
      Math.PI * 2
    );
    ctx.lineTo(this.origin[0] + this.width / 2, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
    ctx.stroke();
  };
}

//arcs

function LineArc(origin, width, startAngle) {
  this.origin = [...origin];
  this.width = width;
  this.angle = (startAngle * Math.PI) / 180;

  this.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = background;
    ctx.lineWidth = arcLineWidth;

    ctx.arc(
      this.origin[0] - this.width / 2,
      this.origin[1],
      this.width,
      this.angle,
      Math.PI * 2
    );
    ctx.lineTo(this.origin[0] + this.width / 2, canvas.height);
    ctx.stroke();
  };
}

///circle
function Circle(center, radius) {
  this.center = center;
  this.radius = radius;

  this.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = gold;
    ctx.lineWidth = lineWidth;

    ctx.arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2);
    ctx.stroke();
  };
}

///rays

function Line(origin, angle, length, radius, color) {
  this.origin = origin;
  this.angle = angle;
  this.color = color;

  this.start = [
    this.origin[0] + Math.cos((this.angle * Math.PI) / 180) * radius,
    this.origin[1] + Math.sin((this.angle * Math.PI) / 180) * radius,
  ];
  this.end = [
    this.origin[0] + Math.cos((this.angle * Math.PI) / 180) * (length + radius),
    this.origin[1] + Math.sin((this.angle * Math.PI) / 180) * (length + radius),
  ];

  this.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(this.start[0], this.start[1]);
    ctx.lineTo(this.end[0], this.end[1]);
    ctx.stroke();
    ctx.beginPath();
  };

  this.update = function () {
    this.draw();
    this.angle += 0.02;

    this.start = [
      this.origin[0] + Math.cos((this.angle * Math.PI) / 180) * radius,
      this.origin[1] + Math.sin((this.angle * Math.PI) / 180) * radius,
    ];
    this.end = [
      this.origin[0] +
        Math.cos((this.angle * Math.PI) / 180) * (length + radius),
      this.origin[1] +
        Math.sin((this.angle * Math.PI) / 180) * (length + radius),
    ];
  };
}

const sun = new Circle([canvas.width / 2, canvas.height], 200);

const ray = new Line(
  [canvas.width / 2, canvas.height],
  225,
  800,
  0,
  goldTransparent
);

const arc1 = new FilledArc([0, canvas.height / 2], 300, 290);

const arc2 = new FilledArc([150, (canvas.height * 3) / 4], 300, 290);

const arc3 = new FilledArc([300, canvas.height], 300, 290);

const outlineArc1 = new LineArc([0, canvas.height / 2], 290, 300);
const outlineArc11 = new LineArc([0, canvas.height / 2], 280, 300);
const outlineArc12 = new LineArc([0, canvas.height / 2], 270, 300);
const outlineArc13 = new LineArc([0, canvas.height / 2], 220, 300);

const outlineArc2 = new LineArc([150, (canvas.height * 3) / 4], 290, 300);
const outlineArc21 = new LineArc([150, (canvas.height * 3) / 4], 280, 300);
const outlineArc22 = new LineArc([150, (canvas.height * 3) / 4], 270, 300);
const outlineArc23 = new LineArc([150, (canvas.height * 3) / 4], 220, 300);

const outlineArc3 = new LineArc([300, canvas.height], 290, 290);
const outlineArc31 = new LineArc([300, canvas.height], 280, 290);
const outlineArc32 = new LineArc([300, canvas.height], 270, 290);
const outlineArc33 = new LineArc([300, canvas.height], 220, 290);

let rayArray = [];

for (let i = 0; i < 45; i++) {
  let newRay = new Line(
    [0, canvas.height],
    0 + 8 * i,
    3000,
    0,
    goldTransparent
  );
  rayArray.push(newRay);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // sun.draw();
  rayArray.forEach((ray) => {
    ray.update();
  });
  arc3.draw();
  outlineArc3.draw();
  outlineArc31.draw();
  outlineArc32.draw();
  // outlineArc33.draw();
  arc2.draw();
  outlineArc2.draw();
  outlineArc21.draw();
  outlineArc22.draw();
  // outlineArc23.draw();
  arc1.draw();
  outlineArc1.draw();
  outlineArc11.draw();
  outlineArc12.draw();
  // outlineArc13.draw();
}

animate();
