import { fn } from '../core'
import { domManip } from '../utils/domManip'

fn.append = function (...args) {
  return domManip(
    this,
    args,
    function (elem, temp) {
      elem.appendChild(temp)
    },
    false,
  )
}
