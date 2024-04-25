import { fn } from '../core'
import { domManip } from '../utils/domManip'

fn.before = function (...args) {
  return domManip(
    this,
    args,
    function (elem, temp) {
      if (elem.parentNode) {
        elem.parentNode.insertBefore(temp, elem)
      }
    },
    true,
  )
}
