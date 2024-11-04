export const deepCopy = (source) => {
  if (source === null || typeof source !== "object") {
    return source;
  }
  const target = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = deepCopy(source[key]);
    }
  }
  return target;
};

export function isDeepEqual(target, source) {
  if (target === source) {
    return true;
  }

  if (
    typeof target !== "object" ||
    target === null ||
    typeof source !== "object" ||
    source === null
  ) {
    return false;
  }
  const targetKeys = Object.keys(target);
  const sourceKeys = Object.keys(source);
  if (targetKeys.length !== sourceKeys.length) {
    return false;
  }
  for (let i = 0; i < targetKeys.length; i++) {
    const key = targetKeys[i];
    if (!isDeepEqual(target[key], source[key])) {
      return false;
    }
  }
  return true;
}
