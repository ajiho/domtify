import { fn } from '../core'
import selectElementsByProp from '../utils/selectElementsByProp'
import traverseFilter from '../utils/traverseFilter';



fn.nextUntil = function (selector, filter) {

    return traverseFilter(selectElementsByProp(this, "nextSibling", selector), filter)

}
