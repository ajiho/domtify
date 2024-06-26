import { fn } from '../core'

import selectElementsByProp from '../utils/selectElementsByProp'
import traverseFilter from '../utils/traverseFilter';


fn.parentsUntil = function (selector, filter) {

    return traverseFilter(selectElementsByProp(this, 'parentNode', selector), filter)

}
