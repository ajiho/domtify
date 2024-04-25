import { isString, isHtmlString, isFunction, isElem } from '../utils'

import sanitize from './sanitize'
import '../ext/each'

const Default = {
  //是否反转参数
  reverse: false,
  //是否克隆
  cloneNode: true,
}

const createHtmlNode = (htmlStr) => {
  const div = document.createElement('div')
  div.innerHTML = htmlStr
  return div.firstElementChild
}

//collection就是domtify实例
export const domManip = (collection, args, callback, options) => {
  //参数合并
  options = {
    ...Default,
    ...options,
  }

  //参数静态化不过不这样的话，如果是HTMLCollection如果动态添加后，在遍历的时候它数组长度会改变，遍历逻辑会错乱
  let firstParam = args[0]
  let firstParamIsFunction = isFunction(firstParam)
  let fnResult = {}

  if (firstParamIsFunction) {
    collection.each((item, index) => {
      fnResult[index] = sanitize(firstParam.call(item, index, item.textContent))
    })
  }
  Object.freeze(fnResult) //冻结该对象防止被更改

  let flatArgs = sanitize(args)
  if (options.reverse) {
    flatArgs = flatArgs.reverse()
  }

  let last = false
  return collection.each((elem, index) => {
    if (firstParamIsFunction) {
      flatArgs = fnResult[index] //这里就表示直接取上面函数的静态化参数了
      if (options.reverse) {
        flatArgs = flatArgs.reverse()
      }
    }

    last = index === collection.length - 1 ? true : false

    //参数遍历
    flatArgs.forEach((item) => {
      //回调的参数
      let node
      //1.字符串
      if (isString(item)) {
        if (isHtmlString(item)) {
          //创建dom
          //htmlString
          node = createHtmlNode(item)
        } else {
          //textNode
          node = document.createTextNode(item)
        }
      } else if (isElem(item) || item instanceof Text) {
        //如果克隆选项启用，且是最后一个才进行克隆
        node = options.cloneNode && !last ? item.cloneNode(true) : item
      }
      //调用方法
      callback.call(elem, node)
    })
  })
}
