import { fn, domtify } from "../core";


fn.filter = function (selector) {

    //默认是选择器
    let callbackFn = item => item?.matches(selector || '*')

    //函数
    if (typeof selector === 'function') callbackFn = selector

    //domtify实例
    if (selector instanceof domtify) {
        callbackFn = item => (selector.result).indexOf(item) !== -1;
    }

    //调用数组原生的filter过滤
    this.result = this.result.filter((item, index, array) => callbackFn.call(item, item, index, array));

    return this;


}


