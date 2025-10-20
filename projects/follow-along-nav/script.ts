(function initialize() {
  const triggers = document.querySelectorAll('.cool > li') as NodeListOf<HTMLLIElement>;
  const background = document.querySelector('.dropdownBackground') as HTMLDivElement;
  const nav = document.querySelector('.top') as HTMLElement;

  function handleEnter(this: HTMLLIElement) {
    this.classList.add('trigger-enter');
    setTimeout(() => {
      if (this.classList.contains('trigger-enter')) {
        this.classList.add('trigger-enter-active');
      }
    }, 150);
    background.classList.add('open');

    const dropdown = this.querySelector('.dropdown') as HTMLDivElement
    const navCoords = nav.getBoundingClientRect();
    const dropdownCoords = dropdown.getBoundingClientRect();
    const coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      left: dropdownCoords.left -navCoords.left,
      top: dropdownCoords.top - navCoords.top,
    };

    background.style.setProperty('width', `${coords.width}px`);
    background.style.setProperty('height', `${coords.height}px`);
    background.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
  }

  function handleLeave(this: HTMLLIElement) {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('mouseenter', handleEnter);
    trigger.addEventListener('mouseleave', handleLeave);
  });

}());