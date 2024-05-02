import { fn } from '../core'
import { isString, isNumber, isFunction, isPlainObject } from '../utils/index'
import isNeedPx from '../utils/isNeedPx'

import camelCase from '../utils/camelCase'





const addPx = (property, value) => {

    //数字，或者数字字符串
    return ((isNumber(value) || /^\d+$/.test(value)) && isNeedPx(camelCase(property))) ? value + 'px' : value
}



fn.css = function (property, value) {



    //设置
    if (isString(value) || isNumber(value)) {

        return this.each((elem) => {

            elem.style[property] = addPx(property, value);
        })

    }


    //设置
    if (isFunction(value)) {

        return this.each((elem, index) => {
            const oldValue = getComputedStyle(elem).getPropertyValue(property)
            elem.style[property] = addPx(property, value.call(elem, index, oldValue))
        })

    }


    //设置
    if (isPlainObject(property)) {

        return this.each((elem) => {

            for (const [key, value] of Object.entries(property)) {

                elem.style[key] = addPx(key, value);

            }

        })

    }

}
