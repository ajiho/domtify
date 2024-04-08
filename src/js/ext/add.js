import { fn, domtify } from "../core";
import { arrUnique } from "../utils";
import './each'
import './get'


fn.add = function (selector, context) {
    return domtify(arrUnique([...this.get(), ...domtify(selector, context).get()]))
}

