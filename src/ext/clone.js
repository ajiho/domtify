import { fn } from '../core'
import './each'

fn.clone = function (deep = false) {
  return this.map((item) => item?.cloneNode(deep))
}
