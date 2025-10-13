(function initialize(){
  const toggleOpen = (event: MouseEvent) => {
    const clickedPanel = event.currentTarget as HTMLDivElement;
    clickedPanel.classList.toggle('open');
  };

  const toggleActive = (event: TransitionEvent) => {
    if (event.propertyName.includes('flex')) {
      const clickedPanel = event.currentTarget as HTMLDivElement;
      clickedPanel.classList.toggle('open-active');
    }
  };

  const panels = document.querySelectorAll('.panel') as NodeListOf<HTMLDivElement>;
  panels.forEach(panel => {
    panel.addEventListener('click', toggleOpen);
    panel.addEventListener('transitionend', toggleActive);
  });
}())