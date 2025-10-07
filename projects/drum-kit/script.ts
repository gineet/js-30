(function initialize() {
  /**
   * Event handler for `transitionend` event that removes the 'playing' class from the element.
   * Ignores transitions that are not done on the 'transform' property.
   *
   * @param event - The `TransitionEvent` triggered when a transition ends. It is expected that the
   * event's `currentTarget` is an `HTMLElement`.
   *
   * @remarks
   * Casts the `event.currentTarget` as `HTMLElement` to safely remove the class 'playing' from `classList`.
   *
   * @example
   * const element = document.querySelector('.key');
   * element.addEventListener('transitionend', removeTransition);
   *
   */
  const removeTransition = (event: TransitionEvent) => {
    if (event.propertyName !== 'transform') {
      return;
    }
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('playing');
  };

  /**
   * Plays the corresponding audio element and adds a visual effect to the pressed key
   *
   * This function:
   * 1. Gets the `key` property from `KeyboardEvent` for the pressed key and converts it to lowercase.
   * 2. Finds the corresponding `<audio>` element and the `.key` div element using the `data-key` attribute.
   * 3. Resets the audio playback to the start and then plays the audio.
   * 4. Adds the 'playing' class for visual feedback.
   *
   * If no matching audio or key element is found, function exists silently.
   * Any errors thrown are logged to the console using `console.error`.
   *
   * @param event - The `KeyboardEvent` triggered when a key is pressed.
   *
   * @remarks
   * - The `data-key` attribute on the audio and key div element must match the lowercase value of `event.key`.
   * - The 'playing' class is used to trigger the CSS transition for the visual feedback.
   *
   * @example
   * // Attach this to the `window` element to handle key presses
   * window.addEventListener('keydown', playSound);
   */
  const playSound = (event: KeyboardEvent) => {
    const keyLowercase = event.key.toLowerCase();
    const audioElement: HTMLAudioElement | null = document.querySelector(`audio[data-key="${keyLowercase}"]`);
    const keyElement: HTMLDivElement | null = document.querySelector(`.key[data-key="${keyLowercase}"]`);
    if (!audioElement || !keyElement) {
      return;
    }

    audioElement.currentTime = 0;
    try {
      void audioElement.play();
      keyElement.classList.add('playing');
    } catch (error) {
      console.error(`Error playing audio for key: ${keyLowercase}`, error);
    }
  }

  // Setup transitionend event listeners for each of the keys
  const allKeys: NodeListOf<HTMLDivElement> = document.querySelectorAll('.key');
  allKeys.forEach((key) => {
    key.addEventListener('transitionend', removeTransition);
  })

  // Setup keydown event to listen for keystrokes and play corresponding sound
  window.addEventListener('keydown', playSound);
}());
