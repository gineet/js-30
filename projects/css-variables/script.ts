(function initialize() {
  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.controls input');

  const handleUpdate = (event: MouseEvent | Event) => {
    const input = event.currentTarget as HTMLInputElement;
    const suffix = input.dataset.sizing || '';
    const property = input.name; // the CSS variable to be updated
    const value = input.value;

    document.documentElement.style.setProperty(`--${property}`, value + suffix);
  }

  inputs.forEach(input => {
    input.addEventListener('change', handleUpdate);
    input.addEventListener('mousemove', handleUpdate);
  })
}());