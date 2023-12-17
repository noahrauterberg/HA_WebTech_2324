function multiply(number1, number2) {
  if (!number2) {
    return number1;
  }
  return number1 * number2;
}

function multiplyAll() {
  if (arguments.length == 0) {
    return 0;
  }

  let result = 1;
  for (let i=0; i<arguments.length; i++) {
    result *= arguments[i];
  }
  return result;
}
