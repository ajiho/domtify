

const isElem = el => el instanceof Element;


//用于判断一个对象是否是纯粹的 JavaScript 对象（即不是 DOM 对象、函数、数组等）。具体作用是检查对象是否通过对象字面量或 new Object() 创建，且其原型链上只包含标准的 Object 原型
const isPlainObject = (obj) => {
    if (typeof obj !== 'object' || obj === null || obj instanceof Array) {
        return false
    }
    const prototype = Object.getPrototypeOf(obj)
    return prototype === Object.prototype || prototype === null
}


const isString = (value) => {
    return typeof value === 'string';
}


const isHtmlString = (str) => {
    return str.trim().startsWith('<')
}

const isFunction = (value) => {
    return typeof value === 'function';
}


const isArray = (value) => {
    return Array.isArray(value)
}

const isInstance = (obj, cls) => {
    return obj instanceof cls;
}


const arrUnique = (arr) => [...new Set(arr)];



const isInPage = (node) => {
    return (node === document.body) ? false : document.body.contains(node);
};





export {
    isInPage,
    isArray,
    arrUnique,
    isInstance,
    isFunction,
    isString,
    isHtmlString,
    isElem,
    isPlainObject
}
