const fs = require("fs");
const { TreeOfNumbers, splitTokens } = require("./tree");

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
 * ()  <- brackets prioritize first
 *
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
    OPENING_BRACKET: /^\(/,
    NUMBER: /[0-9]/,
    CLOSING_BRACKET: /\)/,
    ADDITION: /\+/,
    SUBTRACTION: /\-/,
    DIVISION: /\//,
    MULTIPLY: /\*/,
  };

  let finalTokens = [];
  const findType = (token) => {
    for (var type in vocab) {
      if (token === " ") {
        return;
      }
      let hasMatch = vocab[type].exec(token);

      if (hasMatch?.length > 0) {
        finalTokens.push({ value: hasMatch[0], type });
      }
    }
  };

  let tokens = program.split("");

  tokens.map((t) => findType(t)).filter((val) => val);

  const mergedTokens = [];
  let building = "";
  for (var i = 0; i < finalTokens.length; i++) {
    if (finalTokens[i].type === "NUMBER") {
      building += finalTokens[i].value;
    } else {
      if (building.length > 0) {
        mergedTokens.push({ value: building, type: "NUMBER" });
        building = "";
      }
      mergedTokens.push(finalTokens[i]);
    }
  }

  // check nothing was building?
  if (building.length > 0) {
    console.log("finished trailing");
    mergedTokens.push({ value: building, type: "NUMBER" });
  }

  console.log({ mergedTokens });
  return mergedTokens;
};

try {
  const data = fs
    .readFileSync(`${__dirname}/calculator.x`, { encoding: "utf8", flag: "r" })
    .trim();
  const { leftHalf, root, rightHalf } = splitTokens(tokenizer(data));
  const OakyBoy = new TreeOfNumbers();
  OakyBoy.addToTree({ leftHalf, root, rightHalf });
  OakyBoy.printOut();
} catch (err) {
  console.error("looksy look ", err);
}
