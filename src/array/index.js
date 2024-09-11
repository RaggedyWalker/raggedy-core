Array.prototype.myUnshift = function () {
  const elements = arguments;
  const move = elements.length;
  const thisLength = this.length;
  for (let i = thisLength - 1; i > -1; i--) {
    this[i + move] = this[i];
  }
  for (let i = 0; i < move; i++) {
    this[i] = elements[i];
  }
  return this.length;
};

Array.prototype.mySplice = function (index, deleteCount, ...elements) {
  const thisLength = this.length;
  const deleteArray = [];
  for (let i = 0; i < deleteCount; i++) {
    deleteArray.push(this[index]);
    for (let i = index; i < this.length; i++) {
      this[i] = this[i + 1];
    }
    this.length--;
  }

  if (elements?.length > 0) {
    const elementsLength = elements.length;
    const currentLength = this.length;
    for (let i = currentLength - 1; i >= index; i--) {
      this[i + elementsLength] = this[i];
    }
    for (let i = 0; i < elementsLength; i++) {
      this[index + i] = elements[i];
    }
  }
  return deleteArray;
};

[].splice;

export default {};
