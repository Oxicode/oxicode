const classNames = (...classes) => classes.filter(Boolean).join(' ')

const randomElement = function (arrayList) {
  return arrayList[Math.floor((Math.random() * arrayList.length))]
}

const banned = ['zGuBURGGmdY', 'BI465ksrlWs', 'oJlt2XBWuWs', '6e6MhcxiEgA', 'vb-3qEe3rg8', 'f5b17e717f05', 'bb43f82c33c4']

const removeBanned = (list) => list.filter(item => !banned.includes(item.id))

export {
  classNames,
  randomElement,
  removeBanned
}
