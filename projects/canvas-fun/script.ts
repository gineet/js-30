(function initialize(){
  const canvas = document.getElementById('draw') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context.strokeStyle = '#BADA55';
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.lineWidth = 10;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let isStrokeWidthIncreasing = true;

  function draw(event: MouseEvent) {
    if (!isDrawing) {
      return;
    }

    console.log({ width: context.lineWidth })

    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    context.beginPath()
    context.moveTo(lastX, lastY);
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY]; // equivalent to individual assignments
    hue++;

    if (hue >= 360) {
      hue = 0;
    }

    if (context.lineWidth >= 70 || context.lineWidth <= 5) {
      isStrokeWidthIncreasing = !isStrokeWidthIncreasing;
    }

    if (isStrokeWidthIncreasing) {
      context.lineWidth++;
    } else {
      context.lineWidth--;
    }
  }

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', (event: MouseEvent) => {
    isDrawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
  });
  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
  });
  canvas.addEventListener('mouseout', () => {
    isDrawing = false;
  });
}());
