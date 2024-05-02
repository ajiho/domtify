import { fn, domtify } from '../core'
import { isString } from '../utils';


import './map'
import './filter'


fn.parent = function (selector) {
    this.map((item) => {
        const parent = item.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
    })

    if (selector && isString(selector)) {//过滤
        this.filter(selector)
    }

    return this;
}
