let array = ["hund", "katze", "maus", "elefant", "schlange", "stachelschwein", "affe", "giraffe"];

function addArrayElement(element) {
  let arrayCopy = [...array];

  if (arrayCopy.includes(element)) {
    return arrayCopy;
  }

  arrayCopy.push(element);
  return arrayCopy;
}

function getArrayElements(number, startIndex) {
  let result = [];

  startIndex = startIndex % array.length

  for (let i=startIndex; i<startIndex+number; i++) {
    if (i >= array.length) {
      break;
    }
    result.push(array[i]);
  }

  return result;
}

function deleteArrayElements(number, startIndex, everyIth) {
  let arrayCopy = [...array];
  let removedItems = [];

  startIndex = startIndex % array.length

  for (let i=startIndex;i<startIndex+number && i<array.length; i+=everyIth) {
    let curItem = array[i];
    removedItems.push(curItem);
    let curIndex = arrayCopy.indexOf(curItem);
    arrayCopy[curIndex] = null;
  }

  return {
    newResult: arrayCopy,
    removedItems: removedItems
  };  
}
