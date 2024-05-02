import { fn } from '../core'

import selectElementsByProp from '../utils/selectElementsByProp'
import traverseFilter from '../utils/traverseFilter';


fn.parents = function (selector) {

    return traverseFilter(selectElementsByProp(this, 'parentNode'), selector)



}
