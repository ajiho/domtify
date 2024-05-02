import { fn } from '../core'
import { domManip } from '../utils/domManipulation'

fn.append = function (...args) {
  return domManip(this, args, function (node) {
    this.appendChild(node)
  })
}
