import { domtify } from '../core'


import '../ext/is'
import '../ext/each'



const selectElementsByProp = (domtifyObj, prop, until) => {

	let matched = [];

	domtifyObj.each(elem => {

		while ((elem = elem[prop]) && elem.nodeType !== 9) {

			if (elem.nodeType === 1) {//1:表示是一个element元素https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType#node.element_node

				if (until && domtify(elem).is(until)) break;

				matched.push(elem);

			}
		}
	})

	return matched;

}

export default selectElementsByProp;

