import { fn } from '../core'
import getSibling from '../utils/getSibling'

import './map'
import './filter'

fn.next = function (selector) {
  return this.map((item) => {
    return getSibling(item, 'nextSibling')
  }).filter(selector)
}
