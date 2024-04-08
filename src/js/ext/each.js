import { fn } from "../core";


fn.each = function (callback) {
    this.result.forEach(function (element, index, array) {
        callback.call(element, element, index, array)
    })
    return this;
}


