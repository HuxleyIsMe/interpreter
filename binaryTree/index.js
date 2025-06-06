
const numbers = [3,2,5,1,7,4,2]


class BinaryTree {
    constructor(node){
        this.head = node
        this.left = node.left
        this.right = node.right
    }

    printTree(){
        console.log(JSON.stringify(this.head))
    }


    depthFirstTraversal(target){

        let res = { found: false, depth: undefined}

        const recursiveTraverse = (currentNode, depth, target) => {


            if(currentNode && currentNode?.val == target) {
                res.found = true
                res.depth = depth
                return depth
            }

            if(!currentNode?.left && !currentNode?.right) {
                return depth
            }

            let currDepth = depth + 1


            let left, right;
            left = right = currDepth;
    

            if(currentNode?.left) {
                left = recursiveTraverse(currentNode?.left, currDepth, target)
            }

            if(currentNode?.right) {
                right = recursiveTraverse(currentNode?.right, currDepth, target)
            }

            return Math.max(left, right)

        }


        let deep = recursiveTraverse(this.head, 1, target)

        console.log({deep, res, target})

        return deep

    }

    searchFor(val){


    }


    addNodes(toAdd){

        let vals = [...toAdd]



       while(vals.length) {
            let nextNode = this.head

            let currentVal = vals.pop();

            while(true){
                if(currentVal >= nextNode.val) {
                    if(!nextNode.right) {
                        let newNode = {val : currentVal}
                        nextNode.right = newNode
                        nextNode = newNode
                        break
                    } else {
                        nextNode = nextNode.right
                    }
                }else{
                    //currentVal < nextNode.val
                    if(!nextNode.left) {
                        let newNode = {val : currentVal}
                        nextNode.left = newNode
                        nextNode = newNode
                        break
                    } else {
                        nextNode = nextNode.left
                    }
                }
            }
        }
    }
}





const oakyboy = new BinaryTree({val : 7})
oakyboy.addNodes([3,2,5,1,7,4,2])
oakyboy.depthFirstTraversal(1)
oakyboy.printTree()

