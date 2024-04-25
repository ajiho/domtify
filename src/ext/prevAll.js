import { fn } from '../core'
import getSibling from '../utils/getSibling'

import './map'
import './filter'

fn.prevAll = function (selector) {
  return this.map((item) => {
    return getSibling(item, 'previousSibling')
  }).filter(selector)
}
