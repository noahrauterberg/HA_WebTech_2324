let object = {
  a: "hund", b: "katze", c: "maus", d: "elefant", e: "schlange", f: "stachelschwein", g: "affe", h: "giraffe"
}

function addObjectElement(key, value) {
  let objectCopy = Object.assign({}, object)
  
  if (objectCopy[key]) {
    let newKey = key
    let i = 0
    while (objectCopy[newKey]) {
      i++;
      newKey = `${key}_${i}`;
    }
    key = newKey;
  }
  objectCopy[key] = value;

  return objectCopy;
}

function getObjectElements(keys) {
  let result = [];
  
  for (const key of keys) {
    curVal = object[key];
    if (curVal) {
      result.push(curVal);
    } else {
      result.push("not found");
    }
  }

  return result;
}

function deleteObjectElements(keys) {
  let objectCopy = Object.assign({}, object)

  for (const key of keys) {
    delete objectCopy[key];
  }

  return objectCopy;
}
