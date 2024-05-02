import { fn } from '../core'
import { domManip } from '../utils/domManipulation'

fn.after = function (...args) {
  return domManip(
    this,
    args,
    function (node) {
      if (this.parentNode) {
        this.parentNode.insertBefore(node, this.nextSibling)
      }
    },
    {
      reverse: true,
    },
  )
}
