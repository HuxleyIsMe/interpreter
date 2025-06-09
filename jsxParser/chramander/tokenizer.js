const fs = require("fs");
const { buildTree } = require("./tree");

/**
 * 
    '<div>',
    '<div>',
    '<h1>Hello World</h1>',
    '</div>',
    '<div>',
    "<p>Wow its a lovely lazy day, and another german holiday, i don't know which one...</p>",
    '<p>I am having a coffee crash but had a banging pistachio croissant i wanna find the apricot ones,<strong>Where are they?!</strong></p>',
    '</div>',
    '</div>'

    concepts:
        open
        close 
        text

    - be able tor ecognise open, close and textr
    <xxx>
    close </xxx>
    text = the resT? 


 */

const ELEMENTS = {
  open: /(<(\w*)>)/,
  close: /(<\/(\w*)>)/,
  text: /\w*/,
};

const unfurling = (line) => {
  // how deep does the line go

  let elements = line.split("");

  let building = [];
  let elem = [];

  let isBuildingElem = false;
  for (var i = 0; i < elements.length; i++) {
    let char = elements[i];

    if (char == ">") {
      elem.push(elements[i]);
      isBuildingElem = false;
      let element = elem.join("");
      building.push(element);
      elem = [];
      continue;
    }

    if (isBuildingElem) {
      elem.push(elements[i]);
      continue;
    }

    if (char == "<") {
      if (building.length) {
        let text = elem.join("");
        building.push(text);
        elem = [];
      }
      elem.push(elements[i]);
      isBuildingElem = true;
      continue;
    }

    // else we must have text

    elem.push(line[i]);
  }

  return building.filter((val) => val);
};

const organized = (res) => {
  let final = res.map((ele) => {
    if (ele.match(ELEMENTS.open)) {
      return {
        type: "OPEN_TAG",
        val: ele.match(ELEMENTS.open)[2],
      };
    } else if (ele.match(ELEMENTS.close)) {
      return {
        type: "CLOSE_TAG",
        val: ele.match(ELEMENTS.close)[2],
      };
    } else {
      return {
        type: "TEXT",
        val: ele,
      };
    }
  });
  return final;
};

const SPLITTER_BY_ELEMENTS = new RegExp(/<.*?>/, "gm");

const tokeniser = (data) => {
  // trim the input
  const trimmed = data.split("\n").map((line) => line.trim());
  const splitByElements = trimmed.map((element) => {
    let hasMatch = element.match(SPLITTER_BY_ELEMENTS);

    if (hasMatch.length > 1) {
      let res = unfurling(element);

      return res;
    } else {
      return element;
    }
  });

  let finished = organized(splitByElements.flat());

  return finished;
};

try {
  const data = fs.readFileSync(`${__dirname}/example1.jsx`, {
    encoding: "utf-8",
  });

  let tokens = tokeniser(data);

  let tree = { children: [] };

  let res = buildTree(tokens, tree);
} catch (err) {
  console.error("por quoi? ...", err);
}
