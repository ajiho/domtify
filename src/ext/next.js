import { fn } from '../core'

import selectSibling from '../utils/selectSibling'
import traverseFilter from '../utils/traverseFilter';


fn.next = function (selector) {
    return traverseFilter(selectSibling(this, 'next'), selector);
}


