const makeNode = (val) => ({
    val,
})


const fillout = (half, node) => {

    try {
  
        if(!half.length){
            return
        }

        // if its not one we must have brackets right?
        if(half.length == 1 ) {
            node = makeNode(half[0])
            return node
        }

        if(half[0].type === 'OPENING_BRACKET' ) {
            half.shift()
            half.pop()
        }

        const {leftHalf, root, rightHalf} = splitTokens(half)
        node = makeNode(root)
        node.left = fillout(leftHalf, node.left)
        node.right = fillout(rightHalf, node.right)
        return node
    } catch (err) {
        console.error('por quoir....', err)
    }
    // else its a one of numbers 3 + 6 + 6 + 8
}

 class TreeOfNumbers {
    constructor() {
        this.head = null
    }

    printOut(){
        console.log(JSON.stringify(this.head))
    }

    addToTree({leftHalf, root, rightHalf}){
        this.head = makeNode(root);
        this.head.left = fillout(leftHalf, this.head.left)
        this.head.right = fillout(rightHalf, this.head.right)
    }
}


 const splitTokens = (tokens) => {

    let inBrackets = 0

    const {leftHalf, root, rightHalf} = tokens.reduce((acc, curr) => {

        if(curr.type === 'OPENING_BRACKET') {
            inBrackets +=1
        }

        if(curr.type === 'CLOSING_BRACKET') {
            inBrackets -= 1
        }

        if(curr.type !== 'NUMBER' &&  curr.type !== 'CLOSING_BRACKET'&& !acc.root && !inBrackets) {
            acc.root = curr
        }else if(acc.root) {
            acc.rightHalf.push(curr)
        } else {
            acc.leftHalf.push(curr)
        }

        return acc
    }, {
        leftHalf: [],
        root: undefined,
        rightHalf: []
    })

    return {leftHalf, root, rightHalf}

}

module.exports = {
    TreeOfNumbers,
    splitTokens
}