/*!
 * codepencil v0.0.1 (https://github.com/ajiho/codepencil)
 * Copyright 2023-2024 ajiho
 * license MIT(https://github.com/ajiho/codepencil/blob/master/LICENSE)
 */

const isElem = el => el instanceof Element;

//用于判断一个对象是否是纯粹的 JavaScript 对象（即不是 DOM 对象、函数、数组等）。具体作用是检查对象是否通过对象字面量或 new Object() 创建，且其原型链上只包含标准的 Object 原型
const isPlainObject = obj => {
  if (typeof obj !== 'object' || obj === null || obj instanceof Array) {
    return false;
  }
  const prototype = Object.getPrototypeOf(obj);
  return prototype === Object.prototype || prototype === null;
};
const isString = value => {
  return typeof value === 'string';
};
const isHtmlString = str => {
  return str.trim().startsWith('<');
};
const isFunction = value => {
  return typeof value === 'function';
};
const isArray = value => {
  return Array.isArray(value);
};
const isInstance = (obj, cls) => {
  return obj instanceof cls;
};
const arrUnique = arr => [...new Set(arr)];

class Domtify {
  get length() {
    return this.result.length;
  }
  constructor(selector, context) {
    this.result = [];
    // 如果已经是实例，无需处理直接返回
    if (selector instanceof Domtify) {
      return selector;
    }
    // 字符串处理
    else if (isString(selector)) {
      if (isHtmlString(selector)) {
        //html字符串就直接创建
        const div = document.createElement('div');
        div.insertAdjacentHTML('beforeend', selector);
        this.result = [div.firstChild];
      } else {
        //选择器字符串
        this.result = Array.from((context || document).querySelectorAll(selector));
      }
    } else if (isInstance(selector, NodeList) || isInstance(selector, HTMLCollection)) {
      //是直接传递的NodeList或者HTMLCollection集合
      this.result = Array.from(selector);
    } else if (Array.isArray(selector)) {
      //是数组直接替换
      this.result = selector;
    } else {
      this.result = selector ? [selector] : [];
    }
  }
}

//类的原型
const fn = Domtify.prototype;

//构造函数domtify
const domtify = (selector, context) => new Domtify(selector, context);

//把类原型赋值给构造函数的原型，最后再赋值给构造函数domtify的fn属性，在js中，函数也是一种特殊的对象，因此也可以拥有属性。
domtify.fn = domtify.prototype = fn;

fn.each = function (callback) {
  this.result.forEach(function (element, index, array) {
    callback.call(element, element, index, array);
  });
  return this;
};

fn.addClass = function (className) {
  const list = res => isArray(res) ? res : isString(res) ? res.split(" ") : [];
  let classList = [];
  return this.each((item, index) => {
    var _item$classList;
    // 处理函数返回值
    if (isFunction(className)) {
      classList = list(className.call(item, index, isElem(item) ? item.classList.value : item));
    } else {
      classList = list(className);
    }
    item == null || (_item$classList = item.classList) == null || _item$classList.add(...classList);
  });
};

fn.map = function (callback) {
  this.result = this.result.map((element, index, array) => callback.call(element, element, index, array));
  return this;
};

fn.filter = function (selector) {
  //默认是选择器
  let callbackFn = item => item == null ? void 0 : item.matches(selector || '*');

  //函数
  if (typeof selector === 'function') callbackFn = selector;

  //domtify实例
  if (selector instanceof domtify) {
    callbackFn = item => selector.result.indexOf(item) !== -1;
  }

  //调用数组原生的filter过滤
  this.result = this.result.filter((item, index, array) => callbackFn.call(item, item, index, array));
  return this;
};

fn.eq = function (index) {
  this.result = [this.result.at(index)];
  return this;
};

fn.first = function () {
  return this.eq(0);
};

fn.last = function () {
  return this.eq(-1);
};

fn.get = function (index) {
  return Number.isInteger(index) ? this.result.at(index) : this.result;
};

const flatArgs = args => {
  const uniqueMap = new Map();
  return (Array.isArray(args) ? args : [args]).flat(Infinity).flatMap(item => {
    if (item instanceof Domtify) {
      return item.result;
    }
    if (item instanceof NodeList || item instanceof HTMLCollection) {
      return Array.from(item);
    }
    return item;
  }).filter(item => {
    if (item instanceof Element) {
      //不允许重复的Element
      if (!uniqueMap.has(item)) {
        uniqueMap.set(item, true);
        return true;
      } else {
        return false;
      }
    }
    if (item === null || typeof item === 'number') {
      //null也删除
      return false;
    }
    return true;
  });
};

fn.append = function (...args) {
  //参数静态化
  let firstParam = args[0];
  let firstParamIsFunction = isFunction(firstParam);
  let fnResult = {};
  this.each((item, index) => {
    if (firstParamIsFunction) {
      fnResult[index] = flatArgs(firstParam.call(item, index, item.textContent));
    }
  });
  Object.freeze(fnResult); //冻结该对象防止被更改

  let collection = flatArgs(args);
  let last = false;
  return this.each((elem, index) => {
    if (firstParamIsFunction) {
      collection = fnResult[index];
    }
    last = index === this.length - 1 ? true : false;
    collection.forEach(item => {
      //1.字符串
      if (isString(item)) {
        if (isHtmlString(item)) {
          elem.insertAdjacentHTML('beforeend', item);
        } else {
          elem.insertAdjacentText('beforeend', item);
        }
      } else if (isElem(item) || item instanceof Text) {
        //元素
        if (last === true) {
          //最后一个目标元素
          elem.appendChild(item);
        } else {
          elem.appendChild(item.cloneNode(true));
        }
      }
    });
  });
};

domtify.extend = function () {
  let options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    //第一个参数
    i = 1,
    length = arguments.length,
    deep = false;

  // 处理深度复制情况
  if (typeof target === 'boolean') {
    deep = target;

    // 跳过布尔值和目标
    target = arguments[i] || {};
    i++;
  }

  // 当目标是字符串或其他东西时处理大小写（可能在深度复制中）
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }

  // 如果只传递一个参数，则扩展jQuery本身
  if (i === length) {
    target = this;
    i--;
  }
  for (; i < length; i++) {
    // 仅处理非null/未定义的值
    if ((options = arguments[i]) != null) {
      // 延伸基础对象
      for (name in options) {
        copy = options[name];
        // 防止Object.prototype污染
        // 防止无休止的循环
        if (name === '__proto__' || target === copy) {
          continue;
        }

        // 如果我们正在合并普通对象或数组，则重复出现
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          src = target[name];

          // 确保源值的类型正确
          if (copyIsArray && !Array.isArray(src)) {
            clone = [];
          } else if (!copyIsArray && !isPlainObject(src)) {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;

          // 从不移动原始对象，而是克隆它们
          target[name] = this.extend(deep, clone, copy);

          // 不要引入未定义的值
          // } else if (copy !== undefined) {
        } else {
          target[name] = copy;
        }
      }
    }
  }
  // 返回修改后的对象
  return target;
};

fn.clone = function (deep = false) {
  return this.map(item => item == null ? void 0 : item.cloneNode(deep));
};

fn.add = function (selector, context) {
  return domtify(arrUnique([...this.get(), ...domtify(selector, context).get()]));
};

export { domtify as default };
//# sourceMappingURL=domtify.esm.js.map