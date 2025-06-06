const makeNode = (val) => ({
    val,
    left: undefined, 
    right: undefined,
})

class TreeOfNumbers {
    constructor(node) {
        this.head = node
        this.left = node.left
        this.right = node.right
    }

    printOut(){
        console.log(JSON.stringify(this.head))
    }

    addToTree({leftHalf, root, rightHalf}){

        this.head = makeNode(root);
       

        
    }
}

const splitTokens = (tokens) => {

    const {leftHalf, root, rightHalf} = tokens.reduce((acc, curr) => {
        if(curr.type === 'OPERATOR' && !acc.root) {
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
