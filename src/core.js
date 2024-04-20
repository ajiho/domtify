import { isString, isHtmlString, isInstance } from "./utils";



class Domtify {

    result = []

    get length() {
        return this.result.length
    }

    constructor(selector, context) {
        // 如果已经是实例，无需处理直接返回
        if (selector instanceof Domtify) {
            return selector;
        }
        // 字符串处理
        else if (isString(selector)) {

            if (isHtmlString(selector)) {//html字符串就直接创建
                const div = document.createElement('div');
                div.insertAdjacentHTML('beforeend', selector)
                this.result = [div.firstChild]
            } else {//选择器字符串
                this.result = Array.from((context || document).querySelectorAll(selector));
            }
        }
        else if (isInstance(selector, NodeList) || isInstance(selector, HTMLCollection)) {//是直接传递的NodeList或者HTMLCollection集合
            this.result = Array.from(selector)
        }

        else if (Array.isArray(selector)) {//是数组直接替换
            this.result = selector
        } else {
            this.result = selector ? [selector] : []
        }
    }
}



//类的原型
const fn = Domtify.prototype



//构造函数domtify
const domtify = (selector, context) => new Domtify(selector, context)


//把类原型赋值给构造函数的原型，最后再赋值给构造函数domtify的fn属性，在js中，函数也是一种特殊的对象，因此也可以拥有属性。
domtify.fn = domtify.prototype = fn


export { domtify, domtify as d, fn, Domtify }
