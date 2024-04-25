import { fn } from '../core'
import { domManip } from '../utils/domManip'

fn.replaceWith = function (...args) {
  return domManip(
    this,
    args,
    function (elem, temp) {
      const parent = elem.parentNode

      if (parent) {
        parent.replaceChild(temp, elem)
      }
    },
    true,
  )
}
