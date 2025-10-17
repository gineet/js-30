type PlateItem = {
  text: string;
  done: boolean;
}

(function initialize() {
  const addItemForm = document.querySelector('.add-items') as HTMLFormElement;
  const itemsList = document.querySelector('.plates') as HTMLUListElement;
  const itemsFromLS = localStorage.getItem('items');
  let items: PlateItem[] = itemsFromLS ? JSON.parse(itemsFromLS) : [];

  const buttons = document.querySelectorAll('.buttons button') as NodeListOf<HTMLButtonElement>;
  const validButtonOperations = ['check', 'uncheck', 'remove'];

  function persistItems(items: PlateItem[]) {
    localStorage.setItem('items', JSON.stringify(items));
  }


  function populateList(plates: PlateItem[] = [], platesList: HTMLUListElement) {
    const html = plates.map((plate, idx) => `
      <li>
        <input type="checkbox" data-index="${idx}" id="item-${idx}" ${plate.done ? 'checked' : ''} />
        <label for="item-${idx}">${plate.text}</label>
      </li>
    `).join('');
    platesList.innerHTML = html;
  }

  function addItem(this: HTMLFormElement, event: SubmitEvent) {
    event.preventDefault();
    const inputField = this.querySelector('[name="item"]') as HTMLInputElement;
    const text = inputField.value;

    const itemToAdd: PlateItem = {
      text,
      done: false,
    };

    items.push(itemToAdd);
    populateList(items, itemsList);
    persistItems(items);
    this.reset();
  }

  function toggleDone(event: PointerEvent) {
    /*
      In TypeScript, event.target is typed as EventTarget | null
      1. DOM spec allows events in rare cases that don't have targets
      2. Also, you could have manually dispatched events like const event = new MouseEvent('click');
         This will not have an event.target either.
      3. Sometimes in quirky scenarios of element lifecycle, event.target might not be set.

      We also cannot call .matches(..) on EventTarget because it is a very generic type and is implemented
      by many things (window, XMLHttpRequest etc.) so it's not guaranteed to be an HTMLElement.
      => The check `event.target instanceof HTMLElement` takes care of both HTMLElement and null edge case
     */
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    // If clicked item is not an input, we don't process this event
    if (!event.target.matches('input')) {
      return;
    }

    // Check if the index key exists in dataset (input has a data-index attribute or not)
    const inputElement = event.target as HTMLInputElement;
    const index = inputElement.dataset.index;
    if (typeof index === 'undefined') {
      return;
    }

    // Check if the index is a valid number and that the items array has an object at that index
    const numIndex = parseInt(index, 10);
    if (Number.isNaN(numIndex) || !items[numIndex]) {
      return;
    }

    // Mark the item as done and update the state in localStorage
    items[numIndex].done = !items[numIndex].done;
    persistItems(items);
  }

  function handleButtonClick(this: HTMLButtonElement) {
    const operation = this.dataset.operation;
    // No operation property in dataset (no data-operation attribute) OR an invalid operation
    if (typeof operation === 'undefined' || !validButtonOperations.includes(operation)) {
      return;
    }

    if (operation === 'remove') {
      items = [];
    } else {
      items.forEach(item => {
        item.done = operation === 'check'; // true if operation is 'check', else false because it can only be 'uncheck'
      });
    }

    populateList(items, itemsList);
    persistItems(items);
  }

  addItemForm.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);
  buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
  })

  populateList(items, itemsList);
}());