import { fn } from "../core";


fn.eq = function (index) {
    this.result = [this.result.at(index)];
    return this;
}


