import { fn } from "../core";
import { isArray, isFunction, isString, isElem } from "../utils";

import './each'


fn.addClass = function (className) {


    const list = (res) => isArray(res) ? res : isString(res) ? res.split(" ") : [];

    let classList = [];

    return this.each((item, index) => {

        // 处理函数返回值
        if (isFunction(className)) {

            classList = list(className.call(item, index, isElem(item) ? item.classList.value : item))

        } else {
            classList = list(className)
        }

        item?.classList?.add(...classList);
    });
}

