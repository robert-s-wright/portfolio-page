import React, { useEffect, useState, useCallback } from "react";

import styles from "./Welcome.module.css";

import colors from "./../../vars.scss";

function Welcome(props) {
  const { lightMode, headerVisible } = props;

  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCursor(true);
    }, 5000);
  }, []);

  //canvas v2
  useEffect(() => {
    const canvas = document.querySelector("canvas");

    // canvas.width = canvasResize[0];
    // canvas.height = canvasResize[1];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.backgroundColor = "transparent";

    const ctx = canvas.getContext("2d");

    // const centerX = canvas.width / 2;
    // const centerY = canvas.height / 2;

    const background = lightMode ? colors.darkHighlight2 : colors.darkMain;

    const lineWidth = 0.5;

    const arcLineWidth = 1.5;

    const fillColor = lightMode ? colors.darkHighlight4 : colors.darkHighlight4;

    const arcWidth = 200;

    const arcSpacing = 40;

    let activeAngle = 0;

    function FilledArc(origin, width, startAngle) {
      this.origin = [...origin];
      this.width = width;
      this.angle = (startAngle * Math.PI) / 180;

      this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = fillColor;
        ctx.fillStyle = background;
        ctx.lineWidth = arcLineWidth;

        ctx.arc(
          this.origin[0] - this.width / 2,
          this.origin[1],
          this.width,
          this.angle,
          Math.PI * 2
        );
        ctx.lineTo(this.origin[0] + this.width / 2, canvas.height + lineWidth);
        ctx.lineTo(0, canvas.height + lineWidth);
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
        ctx.strokeStyle = fillColor;
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

    // ///circle
    // function Circle(center, radius) {
    //   this.center = center;
    //   this.radius = radius;

    //   this.draw = function () {
    //     ctx.beginPath();
    //     ctx.strokeStyle = gold;
    //     ctx.lineWidth = lineWidth;

    //     ctx.arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2);
    //     ctx.stroke();
    //   };
    // }

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
        this.origin[0] +
          Math.cos((this.angle * Math.PI) / 180) * (length + radius),
        this.origin[1] +
          Math.sin((this.angle * Math.PI) / 180) * (length + radius),
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

    let arc1;
    let arc2;
    let arc3;
    let outlineArc1;
    let outlineArc11;
    let outlineArc12;
    let outlineArc13;
    let outlineArc2;
    let outlineArc21;
    let outlineArc22;
    let outlineArc23;
    let outlineArc3;
    let outlineArc31;
    let outlineArc32;
    let outlineArc33;

    let rayArray = [];

    for (let i = 0; i < 45; i++) {
      let newRay = new Line(
        [0, canvas.height / 2],
        0 + 8 * i,
        3000,
        0,
        fillColor
      );
      rayArray.push(newRay);
    }

    function redrawOnResize() {
      arc1 = new FilledArc(
        [0, canvas.height - 600],
        arcWidth,
        arcWidth - arcSpacing
      );

      arc2 = new FilledArc(
        [arcWidth / 2, canvas.height - 400],
        arcWidth,
        arcWidth - arcSpacing
      );

      arc3 = new FilledArc(
        [arcWidth, canvas.height - 200],
        arcWidth,
        arcWidth - arcSpacing
      );

      outlineArc1 = new LineArc(
        [0, canvas.height - 600],
        arcWidth - arcSpacing,
        arcWidth
      );
      outlineArc11 = new LineArc(
        [0, canvas.height - 600],
        arcWidth - 2 * arcSpacing,
        arcWidth
      );
      outlineArc12 = new LineArc(
        [0, canvas.height - 600],
        arcWidth - 3 * arcSpacing,
        arcWidth
      );
      outlineArc13 = new LineArc(
        [0, canvas.height - 600],
        arcWidth - 4 * arcSpacing,
        arcWidth
      );

      outlineArc2 = new LineArc(
        [arcWidth / 2, canvas.height - 400],
        arcWidth - arcSpacing,
        arcWidth
      );
      outlineArc21 = new LineArc(
        [arcWidth / 2, canvas.height - 400],
        arcWidth - 2 * arcSpacing,
        arcWidth
      );
      outlineArc22 = new LineArc(
        [arcWidth / 2, canvas.height - 400],
        arcWidth - 3 * arcSpacing,
        arcWidth
      );
      outlineArc23 = new LineArc(
        [arcWidth / 2, canvas.height - 400],
        arcWidth - 4 * arcSpacing,
        arcWidth
      );

      outlineArc3 = new LineArc(
        [arcWidth, canvas.height - 200],
        arcWidth - arcSpacing,
        arcWidth - arcSpacing
      );
      outlineArc31 = new LineArc(
        [arcWidth, canvas.height - 200],
        arcWidth - 2 * arcSpacing,
        arcWidth - arcSpacing
      );
      outlineArc32 = new LineArc(
        [arcWidth, canvas.height - 200],
        arcWidth - 3 * arcSpacing,
        arcWidth - arcSpacing
      );
      outlineArc33 = new LineArc(
        [arcWidth, canvas.height - 200],
        arcWidth - 4 * arcSpacing,
        arcWidth - arcSpacing
      );

      rayArray.forEach((ray) => {
        ray.origin = [0, canvas.height];
      });
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

    // function drawArcs() {
    //   requestAnimationFrame(drawArcs);
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   arc3.draw();
    //   outlineArc3.draw();
    //   outlineArc31.draw();
    //   outlineArc32.draw();
    //   // outlineArc33.draw();
    //   arc2.draw();
    //   outlineArc2.draw();
    //   outlineArc21.draw();
    //   outlineArc22.draw();
    //   // outlineArc23.draw();
    //   arc1.draw();
    //   outlineArc1.draw();
    //   outlineArc11.draw();
    //   outlineArc12.draw();
    //   // outlineArc13.draw();
    // }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redrawOnResize();
    }
    redrawOnResize();
    animate();

    window.addEventListener("resize", resize, { passive: true });

    return () => window.removeEventListener("resize", resize);
  }, [lightMode]);

  return (
    <div
      className={[
        styles.wrapper,
        lightMode ? styles.light : styles.dark,
        headerVisible ? styles.headerVisible : "",
      ].join(" ")}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>
            <span>W</span>
            <span>e</span>
            <span>l</span>
            <span>c</span>
            <span>o</span>
            <span>m</span>
            <span>e </span>
            <span>T</span>
            <span>o </span>
            {/* <span>H</span>
            <span>e</span>
            <span>y</span>
            <span>, </span>
            <span>I</span>
            <span>'</span>
            <span>m </span> */}
            <span>R</span>
            <span>o</span>
            <span>b</span>
            <span>b</span>
            <span>i</span>
            <span>e </span>
            <span>W</span>
            <span>r</span>
            <span>i</span>
            <span>g</span>
            <span>h</span>
            <span>t </span>
            {/* <span>a</span>
            <span>n</span>
            <span>d </span>
            <span>I </span>
            <span>d</span>
            <span>o </span> */}
            <span>W</span>
            <span>e</span>
            <span>b </span>
            <span>D</span>
            <span>e</span>
            <span>v</span>
            <span>e</span>
            <span>l</span>
            <span>o</span>
            <span>p</span>
            <span>m</span>
            <span>e</span>
            <span>n</span>
            <span>t</span>
            <span>.</span>
          </h1>
          {/* <div className={styles.cursor}></div> */}
        </div>
        <br />
        <br />
        <div className={styles.subtitle}>
          <h1>
            Please take a moment to browse through my portfolio and send me a
            message!
            {/* <span>W</span>
            <span>e</span>
            <span>l</span>
            <span>c</span>
            <span>o</span>
            <span>m</span>
            <span>e </span>
            <span>T</span>
            <span>o </span>
            <span>M</span>
            <span>y </span>
            <span>P</span>
            <span>a</span>
            <span>g</span>
            <span>e</span>
            <span>.</span> */}
          </h1>
          {/* <div className={showCursor ? styles.cursor : ""}></div> */}
        </div>
      </div>
      <div></div>
      <canvas className={styles.canvas}></canvas>
      {/* <div className={styles.canvasLetters}>
        <div>R</div>
        <div>S</div>
        <div>W</div>
        <div className={styles.cover}></div>
      </div> */}
      {/* <div className={styles.testing}>*Under Construction*</div> */}
    </div>
  );
}

export default Welcome;
