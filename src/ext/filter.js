import { fn, domtify } from '../core'

fn.filter = function (selector) {
  //默认是选择器
  let callbackFn = (index, item) => item?.matches(selector || '*')

  //函数
  if (typeof selector === 'function') callbackFn = selector

  //domtify实例
  if (selector instanceof domtify) {
    callbackFn = (index, item) => selector.result.indexOf(item) !== -1
  }

  //element元素
  if (selector instanceof Element) {
    callbackFn = (index, item) => this.result.indexOf(selector) !== -1
  }

  //调用数组原生的filter过滤
  this.result = this.result.filter((item, index) =>
    callbackFn.call(item, index, item),
  )

  return this
}
