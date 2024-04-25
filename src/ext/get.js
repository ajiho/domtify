import { fn } from '../core'

fn.get = function (index) {
  return Number.isInteger(index) ? this.result.at(index) : this.result
}
