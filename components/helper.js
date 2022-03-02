const classNames = (...classes) => classes.filter(Boolean).join(' ')

const randomElement = function (arrayList) {
  return arrayList[Math.floor((Math.random() * arrayList.length))]
}

export {
  classNames,
  randomElement
}
