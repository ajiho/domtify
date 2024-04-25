import { fn } from '../core'
import { domManip } from '../utils/domManip'

fn.before = function (...args) {
  return domManip(
    this,
    args,
    function (node) {
      if (this.parentNode) {
        this.parentNode.insertBefore(node, this)
      }
    },
    {
      reverse: true,
    },
  )
}
