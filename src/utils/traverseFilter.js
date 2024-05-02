import { domtify } from '../core'


import { arrUnique } from '.';

import '../ext/filter'
import '../ext/get'


const traverseFilter = (arr, selector) => {

    let matched = arr;


    //选择器过滤
    if (selector && typeof selector === "string") {

        matched = domtify(matched).filter(selector).get();

    }

    //去重
    if (matched.length > 1) {

        matched = arrUnique(matched);
    }

    return domtify(matched)
}

export default traverseFilter;

