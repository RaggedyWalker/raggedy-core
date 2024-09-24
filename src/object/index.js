export const deepCopy = (source) => {
    if (source === null || typeof source !== 'object') {
        return source
    }
    const target = Array.isArray(source) ? [] : {}
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = deepCopy(source[key])
        }
    }
    return target
}