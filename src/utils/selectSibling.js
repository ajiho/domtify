import '../ext/each'



const selectSibling = (domtifyObj, direction) => {

    let matched = [];

    let prop = direction + "ElementSibling"

    domtifyObj.each((elem) => {

        let el = elem[prop]
        if (el) {
            matched.push(el)
        }
    })

    return matched;


}

export default selectSibling;