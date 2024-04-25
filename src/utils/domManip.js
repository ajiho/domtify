import { isString, isHtmlString, isFunction, isElem } from '../utils'

import flatArgs from '../utils/flatArgs'
import '../ext/each'

export function domManip(collection, args, callback, reverse) {
  //参数静态化不过不这样的话，如果是HTMLCollection如果动态添加后，在遍历的时候它数组长度会改变，遍历逻辑会错乱
  let firstParam = args[0]
  let firstParamIsFunction = isFunction(firstParam)
  let fnResult = {}

  if (firstParamIsFunction) {
    collection.each((item, index) => {
      fnResult[index] = flatArgs(firstParam.call(item, index, item.textContent))
    })
  }
  Object.freeze(fnResult) //冻结该对象防止被更改

  let collectiona = flatArgs(args)
  if (reverse === true) {
    collectiona = collectiona.reverse()
  }

  let last = false
  return collection.each((elem, index) => {
    if (firstParamIsFunction) {
      collectiona = fnResult[index]
      if (reverse === true) {
        collectiona = collectiona.reverse()
      }
    }

    last = index === collection.length - 1 ? true : false
    collectiona.forEach((item) => {
      let temp
      //1.字符串
      if (isString(item)) {
        if (isHtmlString(item)) {
          //htmlString

          const tempElement = document.createElement('div')
          tempElement.innerHTML = item
          temp = tempElement.firstElementChild
        } else {
          //textNode
          temp = document.createTextNode(item)
        }
      } else if (isElem(item) || item instanceof Text) {
        //元素
        if (last === true) {
          temp = item
        } else {
          temp = item.cloneNode(true)
        }
      }

      //调用方法
      callback.call(collectiona, elem, temp)
    })
  })
}
