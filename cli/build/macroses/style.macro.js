const { createMacro } = require("babel-plugin-macros");

const BREAKPOINT = {
  lg: 1280,
  md: 960,
  sm: 600,
  xl: 1920,
  xs: 0
};

function handleUp(reference, types) {
  const requiredArgument = reference.parentPath.node.arguments[0];

  if (!requiredArgument) {
    throw new Error("Styling macro requires sizing breakpoint as first parameter.");
  }

  reference.parentPath.replaceWith(types.stringLiteral(`@media(min-width: ${BREAKPOINT[requiredArgument.value]}px)`));
}

function handleDown(reference, types) {
  const requiredArgument = reference.parentPath.node.arguments[0];

  if (!requiredArgument) {
    throw new Error("Styling macro requires sizing breakpoint as first parameter.");
  }

  reference.parentPath.replaceWith(types.stringLiteral(`@media(max-width: ${BREAKPOINT[requiredArgument.value]}px)`));
}

function style({ references, babel }) {
  const { up, down } = references;

  if (up) {
    up.forEach((reference) => handleUp(reference, babel.types));
  }

  if (down) {
    down.forEach((reference) => handleDown(reference, babel.types));
  }
}

module.exports = createMacro(style);
