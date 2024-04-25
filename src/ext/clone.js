import { fn } from '../core'
import './each'

fn.clone = function () {
  return this.map((item) => item?.cloneNode(true))
}
