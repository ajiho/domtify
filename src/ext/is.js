import { fn } from '../core'

import './filter'

fn.is = function (selector) {
  return this.filter(selector).length > 0
}
