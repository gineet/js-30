declare function cornify_add(): any;

(function initialize(){
  const secretCode = 'gineet';

  const pressedKeys: string[] = [];

  window.addEventListener('keyup', function handleKeyUp(event: KeyboardEvent) {
    pressedKeys.push(event.key);
    const start = -secretCode.length - 1;
    const deleteCount = pressedKeys.length - secretCode.length
    pressedKeys.splice(start, deleteCount);
    if (pressedKeys.join('') === secretCode) {
      cornify_add();
    }
  })
}())