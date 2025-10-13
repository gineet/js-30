(function initialize(){
  const player = document.querySelector('.player') as HTMLDivElement;
  const video = document.querySelector('.viewer') as HTMLVideoElement;
  const progress = document.querySelector('.progress') as HTMLDivElement;
  const progressBar = document.querySelector('.progress__filled') as HTMLDivElement;
  const toggle = document.querySelector('.toggle') as HTMLButtonElement;
  const skipButtons = document.querySelectorAll('[data-skip]') as NodeListOf<HTMLButtonElement>;
  const ranges = document.querySelectorAll('.player__slider') as NodeListOf<HTMLInputElement>;
  const fullscreenToggle = document.querySelector('.full-screen') as HTMLButtonElement;

  let mouseDown = false;

  function togglePlay() {
    try {
      const method = video.paused ? 'play' : 'pause';
      video[method]();
    } catch (error) {
      console.error(`Error playing video`, error);
    }
  }

  function updateButton(this: HTMLVideoElement) {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
  }

  function skip(this: HTMLButtonElement) {
    const timeToSkip = this.dataset.skip;
    if (!timeToSkip) {
      return;
    }

    video.currentTime += parseFloat(timeToSkip);
  }

  function handleRangeUpdate(this: HTMLInputElement) {
    if (this.name === 'volume' || this.name === 'playbackRate') {
      video[this.name] = +this.value;
    }
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function scrub(event: MouseEvent) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    void player.requestFullscreen();
  }

  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton)
  video.addEventListener('pause', updateButton)
  video.addEventListener('timeupdate', handleProgress);

  toggle.addEventListener('click', togglePlay);

  skipButtons.forEach((button) => {
    button.addEventListener('click', skip);
  });

  ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
  });

  progress.addEventListener('click', scrub);
  progress.addEventListener('mousedown', () => {
    mouseDown = true;
  });
  progress.addEventListener('mouseup', () => {
    mouseDown = false;
  });
  progress.addEventListener('mousemove', (event: MouseEvent) => {
    if (!mouseDown) return;
    scrub(event);
  });

  fullscreenToggle.addEventListener('click', toggleFullscreen);
}());