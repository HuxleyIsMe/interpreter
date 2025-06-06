const fs = require('fs')


/***
 * 
 * Ok lets set some expectations here because we will not make a perfect parser 
 * so first step is:
 * 
 * IT handles: 
 *  - divs
 *  - h1
 *  - p
 * 
 * it creates us a JS DOM node
 * 
 * Stretch goals:
 *  it can append classes
 */


const elements = {
    '<div>' : '</div>',
    '<p>' : '</p>',
    '<h1>' :'</h1>'
}



const getContent = () => {
    let data = fs.readFileSync(`${__dirname}/mock.jsx`, { encoding: 'utf-8'}).trim()
    const removedWhiteSpace = data.split('\n').map(line => line.trim()).join('')
    return removedWhiteSpace
}


// ok this is weirdly annoyingly hard becauseeeeeee

// i cant just bob it in
// ... or you can begin processing.... and then every time you get a matching end char... 
// you return what you have?


// so like we can have <div><p></p></div>

let buildTree = {}



const parsingElements = (string) => {
    console.log({string})

    // This is greedy so it will find the outer layer of the JSX div
    let itWorks = string.match(/<.*>/)[0]

    let chars = itWorks.split('')
    let leftPointer = 0;
    let element = ''
    while(true) {

        if(chars[leftPointer] === '<') {
            element += chars[leftPointer]
        }

        if(chars[leftPointer] === '>') {
            element += chars[leftPointer]
            let toBuild = elements[element]
            // know the js element to build


        }
        if(leftPointer > chars.length) {
            break;
        }
        leftPointer+=1
    }
    



    console.log({itWorks})
}
const parseJSXToJS = (data) => {
    console.log({data})

    // We need the body?

    const body = /return \(.*\)/.exec(data)

    // but then like what we get the tail end

    console.log({body})

    parsingElements(body[0])

    // ok the white space is causing some pain with the regexp matching

    // we need the return statement




}

parseJSXToJS(getContent())