
const numbers = [3,2,5,1,7,4,2]


class BinaryTree {
    constructor(node){
        this.head = node
        this.left = node.left
        this.right = node.right
    }

    printTree(){
        console.log(this.head)
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

        // do stuff 

        // but ya need to break
       }


    }
}





const oakyboy = new BinaryTree({val : 7})
oakyboy.addNodes([3,2,5,1,7,4,2])
oakyboy.printTree()

