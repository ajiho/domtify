import { fn } from '../core'

import './eq'

fn.first = function () {
  return this.eq(0)
}
