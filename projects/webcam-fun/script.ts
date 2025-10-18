(function initialize(){
  const video = document.querySelector('.player') as HTMLVideoElement;
  const canvas = document.querySelector('.photo') as HTMLCanvasElement;
  const strip = document.querySelector('.strip') as HTMLDivElement;
  const snap = document.querySelector('.snap') as HTMLAudioElement;

  const downloadBtn = document.querySelector('button') as HTMLButtonElement;
  const redEffectBtn = document.querySelector('.toggle-red') as HTMLButtonElement;
  const splitEffectBtn = document.querySelector('.toggle-split') as HTMLButtonElement;

  const ctx = canvas.getContext('2d');

  let isRedEffectOn = false;
  let isRgbSplitOn = false;

  // function getVideo() {
  //   navigator.mediaDevices.getUserMedia({ audio: false, video: true })
  //     .then(localStream => {
  //       video.srcObject = localStream;
  //       void video.play();
  //     })
  //    .catch(err => {
  //      console.error('Oh No!!', err);
  //    });
  // }

  async function getVideo() {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      video.srcObject = localStream;
      void video.play();
    } catch (err) {
      console.log('Error getting video stream', err);
    }
  }

  function paintToCanvas() {
    if (!ctx) {
      return;
    }

    const { videoWidth: width, videoHeight: height } = video;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
      let pixels = ctx.getImageData(0, 0, width, height);
      applyEffect(pixels);
      ctx.putImageData(pixels, 0, 0);
    }, 100);
  }

  function takePhoto() {
    // Play a snap sound
    snap.currentTime = 0;
    void snap.play();

    // Take the data out of the canvas
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome" />`;
    strip.insertBefore(link, strip.firstChild);
  }

  function applyEffect(pixels: ImageData) {
    // Variables needed for green screen effect
    const levels: Record<string, string> = {};
    const allInputSliders = document.querySelectorAll('.rgb input') as NodeListOf<HTMLInputElement>;
    allInputSliders.forEach((input) => {
      levels[input.name] = input.value;
    });
    let red = 0;
    let green = 0;
    let blue = 0;
    // console.log({ levels });

    for (let i = 0; i < pixels.data.length; i += 4) {
      // Red Effect
      if (isRedEffectOn) {
        pixels.data[i] += 100; // R
        pixels.data[i+1] -= 50; // G
        pixels.data[i+2] *= 0.5; // B
      }

      // RGB Split Effect
      if (isRgbSplitOn) {
        pixels.data[i-150] = pixels.data[i];
        pixels.data[i+500] = pixels.data[i+1];
        pixels.data[i-550] = pixels.data[i+2];
      }

      // Green Screen
      red = pixels.data[i];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];

      // Check if pixel eligible for green-screening
      if (
        red >= Number(levels.rmin)
        && green >= Number(levels.gmin)
        && blue >= Number(levels.bmin)
        && red <= Number(levels.rmax)
        && green <= Number(levels.gmax)
        && blue <= Number(levels.bmax)
      ) {
        pixels.data[i+3] = 0;
      }
    } // End looping over pixels
  } // End of applyEffect

  video.addEventListener('playing', paintToCanvas);
  downloadBtn.addEventListener('click', takePhoto);
  redEffectBtn.addEventListener('click', () => {
    isRedEffectOn = !isRedEffectOn;
  });
  splitEffectBtn.addEventListener('click', () => {
    isRgbSplitOn = !isRgbSplitOn;
  });

  void getVideo();
}());


