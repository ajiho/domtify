import { fn } from '../core'
import { domManip } from '../utils/domManip'

fn.replaceWith = function (...args) {
  return domManip(
    this,
    args,
    function (node) {
      const parent = this.parentNode
      if (parent) {
        parent.replaceChild(node, this)
      }
    },
    {
      cloneNode: false,
    },
  )
}
