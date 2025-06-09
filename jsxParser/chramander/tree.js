/**
 *
 * Grammar of this situation
 *
 *
 * open goe's first
 * then we continue to add inside of this i think json works better
 *
 */

const buildTree = (tokens, parent) => {
  console.log({ tokens });

  let currParents = [{ children: [] }];

  for (var i = 0; i < tokens.length; i++) {
    let curr = tokens[i];

    if (curr.type == "OPEN_TAG") {
      let newNode = { ...curr, children: [] };
      // link to to last parent
      let lastParent = currParents[currParents.length - 1];
      lastParent.children.push(newNode);
      currParents.push(newNode);
    } else if (curr.type == "TEXT") {
      let newNode = { ...curr };
      let lastParent = currParents[currParents.length - 1];
      lastParent.children.push(newNode);
      // remove last parent go up a level
    } else {
      // close tag
      currParents.pop(); // go up a layer
    }

    if (currParents.length == 1) {
      break;
    }
  }
  console.log(JSON.stringify(currParents));
};

module.exports = {
  buildTree,
};
