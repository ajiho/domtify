import { fn } from '../core'

import { domManip } from '../utils/domManip'

fn.prepend = function (...args) {
  return domManip(
    this,
    args,
    function (elem, temp) {
      // console.log(elem, temp);

      elem.insertBefore(temp, elem.firstChild)
    },
    true,
  )
}
