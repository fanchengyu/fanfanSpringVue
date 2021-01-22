export function deepClone(obj) {
  if (!isObject(obj)) {
    throw new Error(`${obj} 不是一个对象！`)
  }

  const isArray = Array.isArray(obj)
  const cloneObj = isArray ? [] : {}
  for (const key in obj) {
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  }

  return cloneObj
}
function isObject(o) {
  return (typeof o === 'object') && o !== null
}

// function deepClones(obj) {
//   if (!isObject(obj)) {
//     throw new Error(`${obj} 不是一个对象！`)
//   }
//   const isArray = Array.isArray(obj)
//   const cloneObj = isArray ? [] : {}
//   for (const key in obj) {
//     cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
//   }
//   return cloneObj
// }
