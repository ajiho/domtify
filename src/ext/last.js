import { fn } from '../core'
import './eq'

fn.last = function () {
  return this.eq(-1)
}
