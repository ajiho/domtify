import { fn } from '../core'
import { domManip } from '../utils/domManip'

fn.after = function (...args) {
  return domManip(
    this,
    args,
    function (elem, temp) {
      if (elem.parentNode) {
        elem.parentNode.insertBefore(temp, elem.nextSibling)
      }
    },
    true,
  )
}
