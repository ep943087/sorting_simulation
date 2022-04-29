import Simulation from "./Simulation.js";

class DrawHelper
{
  static COLOR_CIRCLE = "colorCircle";
  static RECTANGLES = "rectangles";
  static SELFIE_IMAGE = "selfieImage";
  static SPIRAL_MATRIX = "spiralMatrix";
  static ZIG_ZAG_MATRIX = "zigZagMatrix";
  static SPIRAL_MATRIX_IMAGE = "spiralMatrixImage";
  static ZIG_ZAG_MATRIX_IMAGE = "zigZagMatrixImage";

  constructor(simulation)
  {
    this.simulation = simulation;
    this.backgroundColor = "white";
    this.canvas = simulation.canvas;
    this.drawType = DrawHelper.COLOR_CIRCLE;
    this.ctx = simulation.canvas.getContext('2d');
    this.imageSrc = "selfie";
    this.initializeImages();
  }

  initializeImages()
  {
    this.selfieImage = new Image(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.selfieImage.src = "images/selfie.png";

    this.mayaImage = new Image(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.mayaImage.src = "images/maya.png";

    this.helloWorldImage = new Image(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.helloWorldImage.src = "images/hello-world.png";

    this.codeImage = new Image(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.codeImage.src = "images/code.png";
  }

  getImage()
  {
    switch (this.imageSrc)
    {
      case "selfie": return this.selfieImage;
      case "maya": return this.mayaImage;
      case "hello-world": return this.helloWorldImage;
      case "code": return this.codeImage;
    }
  }

  draw = () =>
  {
    const { canvas: c, ctx } = this;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    const { offsetWidth: width, offsetHeight: height } = c;
    ctx.fillStyle = this.backgroundColor;

    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);

    switch (this.drawType) {
      case DrawHelper.RECTANGLES:
        return this.drawRectangleSimulation();
      case DrawHelper.COLOR_CIRCLE:
        return this.drawColorCircleSimulation();
      case DrawHelper.SELFIE_IMAGE:
        return this.drawSelfieImageSimulation();
      case DrawHelper.SPIRAL_MATRIX:
        return this.drawSpiralMatrix();
      case DrawHelper.SPIRAL_MATRIX_IMAGE:
        return this.drawSpiralMatrixImage();
      case DrawHelper.ZIG_ZAG_MATRIX:
        return this.drawZigZagMatrix();
      case DrawHelper.ZIG_ZAG_MATRIX_IMAGE:
        return this.drawZigZagMatrixImage();
    }
  }

  getRectangleColor(index)
  {
    const { simulation: sim } = this;
    if (!sim.sorting) return "black";

    switch (sim.sortType) {
      case Simulation.BUBBLE_SORT:
        if (index === sim.i) return "red";
        break;
      case Simulation.SELECTION_SORT:
        if (index === sim.j) return "red";
        if (index === sim.s) return "blue";
        break;
      case Simulation.INSERTION_SORT:
        if (index === sim.j) return "red";
        break;
      case Simulation.QUICK_SORT:
        if (index === sim.i) return "red";
        if (index === sim.j) return "blue";
        break;
    }
    return "black";
  }

  drawRectangleSimulation()
  {
    const { canvas: c, ctx } = this;
    const { width, height } = c;
    const { simulation: { list }} = this;
    const w = width / list.length;
    list.forEach((element, index) => {
      ctx.fillStyle = this.getRectangleColor(index);
      const h = (height / list.length * element) * .9;
      const x = index * w;
      ctx.fillRect(x, height - h, w, h);
    });
  }

  drawColorCircleSimulation()
  {
    const { canvas: c, ctx } = this;
    const { width, height } = c;
    const { simulation: { list }} = this;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width * .90 * .5;
    const angleWidth = (Math.PI * 2) / list.length;
    list.forEach((element, index) => {
      if (!this.drawIndex(index)) return;
      const currentAngle = angleWidth * index;
      ctx.fillStyle = this.calculateHSL(element);
      ctx.beginPath();
      ctx.lineTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angleWidth);
      ctx.moveTo(centerX, centerY);
      ctx.fill();
    });
  }

  drawIndex(index)
  {
    const { simulation: sim } = this;
    if (!sim.sorting) return true;
    switch (sim.sortType) {
      case Simulation.BUBBLE_SORT:
        if (index === sim.i) return false;
        break;
      case Simulation.SELECTION_SORT:
        if (index === sim.j) return false;
        break;
      case Simulation.INSERTION_SORT:
        if (index === sim.j) return false;
        break;
      case Simulation.QUICK_SORT:
        if (index === sim.i || index === sim.j) return false;
        break;
    }
    return true;
  }

  drawSelfieImageSimulation()
  {
    const { canvas: c, ctx } = this;
    const { width, height } = c;
    const { simulation: { list }} = this;
    const w = width / list.length;
    list.forEach((element, index) => {
      if (!this.drawIndex(index)) return;
      ctx.drawImage(this.getImage(), w*index, 0, w, height, w*element, 0, w, height);
    });
  }

  drawSpiralMatrix()
  {
    const { canvas: c, ctx } = this;
    const { width, height } = c;
    const { simulation: { list }} = this;

    const square = Math.round(Math.sqrt(list.length));

    let top = 0;
    let bottom = square - 1;
    let left = 0;
    let right = square - 1;
    let direction = 0;

    const w = width / square;
    const h = height / square;
    let index = 0;
    while (top <= bottom && left <= right) {
      if (direction === 0) {
        for (let i=left;i<=right;i++) {
          if (this.drawIndex(index)) {
            const element = list[index];
            ctx.fillStyle = this.calculateHSL(element);
            ctx.fillRect(i*w, top*h, w, h);
          }
          index++;
        }
        top++;
        direction = 1;
      } else if (direction === 1) {
        for (let j=top;j<=bottom;j++) {
          if (this.drawIndex(index)) {
            const element = list[index];
            ctx.fillStyle = this.calculateHSL(element);
            ctx.fillRect(right*w, j*h, w, h);
          }
          index++;
        }
        right--;
        direction = 2;
      } else if (direction === 2) {
        for (let i=right;i>=left;i--) {
          if (this.drawIndex(index)) {
            const element = list[index];
            ctx.fillStyle = this.calculateHSL(element);
            ctx.fillRect(i*w, bottom*h, w, h);
          }
          index++;
        }
        bottom--;
        direction = 3;
      } else if (direction === 3) {
        for (let j=bottom;j>=top;j--) {
          if (this.drawIndex(index)) {
            const element = list[index];
            ctx.fillStyle = this.calculateHSL(element);
            ctx.fillRect(left*w, j*h, w, h);
          }
          index++;
        }
        left++;
        direction = 0;
      }
    };
  }

  drawSpiralMatrixImage()
  {
    const { simulation: { list }} = this;
    list.forEach((element, index) => {
      if (!this.drawIndex(index)) return;
      this.drawOneElementInSpiralMarixImage(element, index);
    });
  }

  drawOneElementInSpiralMarixImage(element, currentIndex)
  {
    const { canvas: c, ctx } = this;
    const { width, height } = c;
    const { simulation: { list }} = this;

    const square = Math.round(Math.sqrt(list.length));

    let top = 0;
    let bottom = square - 1;
    let left = 0;
    let right = square - 1;
    let direction = 0;

    const w = width / square;
    const h = height / square;
    let index = 0;
    let drawObject = {
      width: w,
      height: h,
    };

    ctx.fillStyle = this.calculateHSL(element);
    while (top <= bottom && left <= right) {
      if (direction === 0) {
        for (let i=left;i<=right;i++) {
          if (currentIndex === index) {
            drawObject.x = i*w;
            drawObject.y = top*h;
          }
          if (element === index + 1) {
            drawObject.iX = i*w;
            drawObject.iY = top*h;
          }
          index++;
        }
        top++;
        direction = 1;
      } else if (direction === 1) {
        for (let j=top;j<=bottom;j++) {
          if (currentIndex === index) {
            drawObject.x = right*w;
            drawObject.y = j*h;
          }
          if (element === index + 1) {
            drawObject.iX = right*w;
            drawObject.iY = j*h;
          }
          index++;
        }
        right--;
        direction = 2;
      } else if (direction === 2) {
        for (let i=right;i>=left;i--) {
          if (currentIndex === index) {
            drawObject.x = i*w;
            drawObject.y = bottom*h;
          }
          if (element === index + 1) {
            drawObject.iX = i*w;
            drawObject.iY = bottom*h;
          }
          index++;
        }
        bottom--;
        direction = 3;
      } else if (direction === 3) {
        for (let j=bottom;j>=top;j--) {
          if (currentIndex === index) {
            drawObject.x = left*w;
            drawObject.y = j*h;
          }
          if (element === index + 1) {
            drawObject.iX = left*w;
            drawObject.iY = j*h;
          }
          index++;
        }
        left++;
        direction = 0;
      }
    };

    ctx.drawImage(
      this.getImage(),
      drawObject.iX,
      drawObject.iY,
      drawObject.width, 
      drawObject.height,
      drawObject.x,
      drawObject.y,
      drawObject.width,
      drawObject.height
    );
  }

  drawZigZagMatrix()
  {
    const { canvas: c, ctx } = this;
    const { width, height } = c;
    const { simulation: { list }} = this;

    const square = Math.round(Math.sqrt(list.length));
    const w = width / square;
    const h = height / square;
    let direction = 0;
    let i = 0;
    let j = 0;

    list.forEach((element, index) => {
      if (this.drawIndex(index)) {
        ctx.fillStyle = this.calculateHSL(element);
        ctx.fillRect(j*w, i*h, w, h);
      }

      if (direction == 0) {
        j++;
        if (j >= square) {
          j = square - 1;
          i++;
          direction = 1;
        }
      } else {
        j--;
        if (j < 0) {
          j = 0;
          i++;
          direction = 0;
        }
      }
    });
  }

  drawZigZagMatrixImage()
  {
    const { simulation: { list }} = this;
    list.forEach((element, index) => {
      if (!this.drawIndex(index)) return;
      this.drawOneElementZigZagMatrix(element, index);
    });
  }

  drawOneElementZigZagMatrix(element, currentIndex)
  {
    const { canvas: c, ctx } = this;
    const { width, height } = c;
    const { simulation: { list }} = this;

    const square = Math.round(Math.sqrt(list.length));
    const w = width / square;
    const h = height / square;
    let direction = 0;
    let i = 0;
    let j = 0;

    const drawObject = {
      width: w,
      height: h,
    };

    list.forEach((_, index) => {
      if (index === currentIndex) {
        drawObject.x = j*w;
        drawObject.y = i*h;
      }
      if (index + 1 === element) {
        drawObject.iX = j*w;
        drawObject.iY = i*h;
      }

      if (direction == 0) {
        j++;
        if (j >= square) {
          j = square - 1;
          i++;
          direction = 1;
        }
      } else {
        j--;
        if (j < 0) {
          j = 0;
          i++;
          direction = 0;
        }
      }
    });

    ctx.drawImage(
      this.getImage(),
      drawObject.iX,
      drawObject.iY,
      drawObject.width,
      drawObject.height,
      drawObject.x,
      drawObject.y,
      drawObject.width,
      drawObject.height
    );
  }

  calculateHSL(element)
  {
    const hue = element / this.simulation.list.length * 360;
    return `hsl(${hue}, 100%, 50%)`;
  }

  setDrawType(drawType)
  {
    this.drawType = drawType;
  }

  setImage(imageSrc)
  {
    this.imageSrc = imageSrc;
  }
}

export default DrawHelper;