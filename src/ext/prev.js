import { fn } from '../core'
import getSibling from '../utils/getSibling'

import './map'
import './filter'

fn.prev = function (selector) {
  return this.map((item) => {
    return getSibling(item, 'previousSibling')
  }).filter(selector)
}
