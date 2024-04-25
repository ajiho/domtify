import { Domtify } from '../core'

//参数消毒
const sanitize = (args) => {
  const uniqueMap = new Map()
  return (Array.isArray(args) ? args : [args]) //不是数组转换成数组
    .flat(Infinity)
    .flatMap((item) => {
      if (item instanceof Domtify) {
        return item.result
      }
      if (item instanceof NodeList || item instanceof HTMLCollection) {
        return Array.from(item)
      }
      return item
    })
    .filter((item) => {
      if (item instanceof Element) {
        //不允许重复的Element
        if (!uniqueMap.has(item)) {
          uniqueMap.set(item, true)
          return true
        } else {
          return false
        }
      }
      if (item === null || typeof item === 'number') {
        //null也删除
        return false
      }
      return true
    })
}

export default sanitize
