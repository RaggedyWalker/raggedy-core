String.prototype.asyncReplaceAll = async function (mode, replacer) {
  const _str = this;
  if (typeof replacer === "string") {
    return _str.replaceAll(mode, replacer);
  }

  if (typeof replacer !== "function") {
    throw new Error("replacer must be a string or function");
  }

  let regex;

  if (typeof mode === "string") {
    regex = new RegExp(mode, "g");
  } else if (mode instanceof RegExp) {
    regex = new RegExp(mode);
  }

  let match = [];
  let lastIndex = 0;
  const result = [];
  while ((match = regex.exec(this)) !== null) {
    const str = this.slice(lastIndex, match.index);
    console.log(match);
    console.log();

    const promise = replacer(str);
    lastIndex = match.index + str.length;
    result.push(str, promise);
  }
  const last = this.slice(lastIndex);
  result.push(last);
  const tmp = await Promise.all(result);
  return tmp.join("");
};

"234_555.ggg".asyncReplaceAll(/\d+/g, async (match) => {
  return "name" + match;
});
