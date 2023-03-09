
/*
function parseStatement() {
    if (match("move")) {
      const distance = parseExpression();
      return { type: "move", distance };
    } else if (match("rotate")) {
      const angle = parseExpression();
      return { type: "rotate", angle };
    } else {
      throw new Error("Unexpected token");
    }
  }
  
  function parseExpression() {
    const token = getNextToken();
    if (token.type === "number") {
      return parseFloat(token.value);
    } else {
      throw new Error("Unexpected token");
    }
  }
  */