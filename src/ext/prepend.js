import { fn } from '../core'

import { domManip } from '../utils/domManipulation'

fn.prepend = function (...args) {
  return domManip(
    this,
    args,
    function (node) {
      this.insertBefore(node, this.firstChild)
    },
    {
      reverse: true,
    },
  )
}
