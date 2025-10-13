(function initialize(){
  const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
  let lastChecked: HTMLInputElement | null = null;

  const handleCheck = (event: PointerEvent) => {
    const clickedCheckbox = event.currentTarget as HTMLInputElement;
    let inBetween = false;

    if (event.shiftKey && clickedCheckbox.checked) {
      checkboxes.forEach((checkbox) => {
        if (checkbox === clickedCheckbox || checkbox === lastChecked) {
          inBetween = !inBetween;
        }

        if (inBetween) {
          checkbox.checked = true;
        }
      })
    }

    lastChecked = clickedCheckbox;
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', handleCheck);
  });
}());