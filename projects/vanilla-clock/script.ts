(function initialize() {
  const secondsHand = document.querySelector('div.second-hand') as HTMLDivElement;
  const minutesHand = document.querySelector('div.min-hand') as HTMLDivElement;
  const hoursHand = document.querySelector('div.hour-hand') as HTMLDivElement;

  /**
   * Updates the seconds, minutes and hours hand of the clock as per the current time.
   *
   * Gets the current date by creating a `new Date()` to retrieve:
   * 1. seconds using `getSeconds()`
   * 2. minutes using `getMinutes()`
   * 3. hours using `getHours()` and uses modules 12 `% 12` to get 12 hour format for hours
   *
   * It then calculates the relevant degrees the hands should be at and applies a transform of `rotate`
   * to position each of the hands correctly.
   *
   * @remarks
   * The +90 in the degrees calculation is done to compensate for the 90 degree rotation done in CSS for starting position
   *
   */
  function setDate() {
    const now = new Date();

    // Update seconds hand
    const seconds = now.getSeconds();
    const secondsDegrees = (seconds * 6) + 90;
    secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;

    // Update minutes hand
    const minutes = now.getMinutes();
    const minutesDegrees = (minutes * 6) + 90;
    minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;

    // Update hours hand
    const hours = now.getHours() % 12;
    const hoursDegrees = (hours * 30) + 90;
    hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;
  }

  setInterval(setDate, 1000);
}());