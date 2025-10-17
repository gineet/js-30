(function initialize() {
  const hero = document.querySelector('.hero') as HTMLDivElement;
  const text = hero.querySelector('h1') as HTMLHeadElement;
  const SHADOW_LENGTH = 200;

  function shadow(this: HTMLDivElement, event: MouseEvent) {
    const { offsetWidth: heroWidth, offsetHeight: heroHeight } = this;
    const { x, y } = event;

    const xShadow = (x / heroWidth * SHADOW_LENGTH) - (SHADOW_LENGTH / 2);
    const yShadow = (y / heroWidth * SHADOW_LENGTH) - (SHADOW_LENGTH / 2);
    const xShadow2 = -xShadow;
    const yShadow2 = -yShadow;

    text.style.textShadow = `
      ${xShadow}px ${yShadow}px 0 rgba(0, 0, 0, .2),
      ${xShadow2}px ${yShadow2}px 0 rgba(0, 0, 0, .2)
    `;
  }

  hero.addEventListener('mousemove', shadow);
}());