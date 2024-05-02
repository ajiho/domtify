import { fn } from '../core'
import selectElementsByProp from '../utils/selectElementsByProp'
import traverseFilter from '../utils/traverseFilter';



fn.nextAll = function (selector) {


  return traverseFilter(selectElementsByProp(this, "nextSibling"), selector)


}
