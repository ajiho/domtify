import { fn } from "../core";
import { isString, isHtmlString, isInstance, isFunction, isElem, isInPage, arrUnique } from "../utils";
import flatArgs from "../utils/flatArgs";

import './each'

fn.append = function (...args) {


    //参数静态化
    let firstParam = args[0];
    let firstParamIsFunction = isFunction(firstParam)
    let fnResult = {};
    this.each((item, index) => {
        if (firstParamIsFunction) {
            fnResult[index] = flatArgs(firstParam.call(item, index, item.textContent))
        }
    })
    Object.freeze(fnResult)//冻结该对象防止被更改





    let collection = flatArgs(args);
    let last = false;
    return this.each((elem, index) => {

        if (firstParamIsFunction) {
            collection = fnResult[index]
        }

        last = index === this.length - 1 ? true : false;
        collection.forEach(item => {
            //1.字符串
            if (isString(item)) {
                if (isHtmlString(item)) {
                    elem.insertAdjacentHTML('beforeend', item)
                } else {
                    elem.insertAdjacentText('beforeend', item)
                }
            } else if (isElem(item) || item instanceof Text) { //元素
                if (last === true) {//最后一个目标元素
                    elem.appendChild(item)
                } else {
                    elem.appendChild(item.cloneNode(true))
                }
            }

        })

    })



}


