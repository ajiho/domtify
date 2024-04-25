import { fn } from '../core'

fn.map = function (callback) {
  this.result = this.result.map((element, index, array) =>
    callback.call(element, element, index, array),
  )
  return this
}
