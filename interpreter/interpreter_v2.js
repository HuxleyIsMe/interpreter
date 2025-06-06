const fs = require('fs')

/**
 * This is a lil calculator, i want to return the sum of the result
 * i want to tokenize
 * i want to AST
 * i want to execute
 */

/**
 *
 * 
 * 
 * 
 * ()  <- brackets prioritise first
 *  perhaps the grammar is even simpler then this, we have operators and then we have values
 * + <- addition
 * - <- subtract
 * / <- divide
 * * <- multiply
 * number 
 */


/**
 * Come back to brackets because they confuse me
 */

const tokenizer = (program) => {

    /**
     * The handling of whitespace was wierdly hard
     * the digit char ketp matching the whitespace char
     * leading to confusion - this could have been caused by the global regexp matcher?
     */

    const vocab = {   
        'OPENING_BRACKET': /^\(/,
        'NUMBER': /[0-9]/,
        'CLOSING_BRACKET': /\)/,
        'OPERATOR' : /\+|\-|\/|\*/ ,
    }

    let finalTokens = []
    const findType = (token) => {
        for(var type in vocab) {

            if(token === ' ') {
                return 
            }
            let hasMatch = vocab[type].exec(token)
        
        
            if(hasMatch?.length > 0  ) {
                finalTokens.push({ value: hasMatch[0], type})
            }
        }
    }

    let tokens = program.split('')

    tokens.map(t => findType(t)).filter(val => val)

    const mergedTokens = []
    let building = ''
    for(var i = 0; i < finalTokens.length; i++) {
        if(finalTokens[i].type === 'NUMBER') {
            building += finalTokens[i].value
        } else {
            if(building.length > 0 ) {
                mergedTokens.push({ value: building, type: 'NUMBER'})
                building=''
            }
            mergedTokens.push(finalTokens[i])
        }
    }
    // check nothing was building?
    if(building.length > 0) {
        console.log('finished trailing')
        mergedTokens.push({ value: building, type: 'NUMBER'})
    }

    return mergedTokens
}


const treeMaker = (tokens) => {


    console.log('step1')

    // needs to handle brackets

    const {leftHalf, root, rightHalf} = splitTokens(tokens)
    
    console.log({leftHalf})

    const theTree = new TreeOfNumbers(root)

    theTree.addToTree({leftHalf, root, rightHalf})

    theTree.printOut()




    // const ourModel = new TreeOfNumbers()




    /**
     * root node will be an operator 
     * 
     * the first chunk will go to the left 
     * 
     * brackets should always go off to there own bit 
     * 
     * 
     *          +
     *     2      +  
     *          3   4
     * 
     * 
     *          +
     *      2       7
     * 
     * 
     */



}



try {

    const data = fs.readFileSync(`${__dirname}/calculator.x`,  { encoding: 'utf8', flag: 'r' }).trim()
    const tokens = tokenizer(data)
    treeMaker(tokens)
    console.log({data})
} catch (err) {
    console.log({err})
}