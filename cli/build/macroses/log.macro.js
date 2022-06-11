const path = require("path");

const { createMacro } = require("babel-plugin-macros");

const IS_DEV = process.env.NODE_ENV === "development";
const PREFIX_COLOR = "color: #bada53";
const EMOJI_LIST = [
  "💀",
  "👽",
  "🔥",
  "✨",
  "🌟",
  "💫",
  "💥",
  "💢",
  "💦",
  "💧",
  "💤",
  "💨",
  "👀",
  "👊",
  "✊",
  "👟",
  "🌴",
  "🌲",
  "🌳",
  "🌰",
  "🌱",
  "🌼",
  "🌐",
  "🌙",
  "⛄",
  "🌀",
  "🌈",
  "🌊",
  "🎍",
  "🎒",
  "🎓",
  "🎏",
  "🎆",
  "🎇",
  "🎐",
  "🎑",
  "🎃",
  "🎄",
  "🎁",
  "🎋",
  "🎉",
  "🎊",
  "🎈",
  "🎌",
  "🔮",
  "🎥",
  "📷",
  "📹",
  "📼",
  "💿",
  "📀",
  "💽",
  "💾",
  "💻",
  "📱",
  "📠",
  "📡",
  "📺",
  "📻",
  "🔊",
  "🔉",
  "🔈",
  "🔇",
  "🔔",
  "🔕",
  "📢",
  "📣",
  "⏳",
  "⌛",
  "⏰",
  "⌚",
  "🔓",
  "🔏",
  "🔐",
  "🔑",
  "🔎",
  "💡",
  "🔦",
  "🔆",
  "🔌",
  "🔋",
  "🔍",
  "🛁",
  "🛀",
  "🚿",
  "🔧",
  "🔩",
  "🔨",
  "🚪",
  "🚬",
  "💣",
  "🔫",
  "🔪",
  "💊",
  "💉",
  "💰",
  "💴",
  "💵",
  "💷",
  "💶",
  "📋",
  "📅",
  "📆",
  "📇",
  "📁",
  "📂",
  "📌",
  "📎",
  "🔬",
  "🔭",
  "📰",
  "🎨",
  "🎬",
  "🎤",
  "🎧",
  "🎼",
  "🎵",
  "🎶",
  "🎹",
  "🎻",
  "🎺",
  "🎷",
  "🎸",
  "👾",
  "🎮",
  "🃏",
  "🎴",
  "🀄",
  "🎲",
  "🎯",
  "🏈",
  "🏀",
  "⚽",
  "⚾",
  "🎾",
  "🎱",
  "🏉",
  "🎳",
  "⛳",
  "🚵",
  "🏁",
  "🏇",
  "🏆",
  "🎿",
  "🏂",
  "🏊",
  "🏄",
  "🎣",
  "🍵",
  "🍶",
  "🍼",
  "🍺",
  "🍻",
  "🍸",
  "🍹",
  "🍷",
  "🍴",
  "🍕",
  "🍔",
  "🍟",
  "🍗",
  "🍖",
  "🍝",
  "🍛",
  "🍤",
  "🍱",
  "🍣",
  "🍥",
  "🍙",
  "🍘",
  "🍚",
  "🍜",
  "🍲",
  "🍢",
  "🍡",
  "🍳",
  "🍞",
  "🍩",
  "🍮",
  "🍦",
  "🍨",
  "🍧",
  "🎂",
  "🍰",
  "🍪",
  "🍫",
  "🍬",
  "🍭",
  "🍯",
  "🍎",
  "🍏",
  "🍊",
  "🍋",
  "🍒",
  "🍇",
  "🍉",
  "🍓",
  "🍑",
  "🍈",
  "🍌",
  "🍐",
  "🍍",
  "🍠",
  "🍆",
  "🍅",
  "🌽"
];

/**
 * Get deterministic hashcode from string to randomize emoji chars.
 */
function getHashCode(target) {
  let hash = 0;

  if (target.length === 0) {
    return hash;
  }

  for (let it = 0; it < target.length; it++) {
    hash = (hash << 5) - hash + target.charCodeAt(it);
    hash |= 0; // Convert to 32bit integer.
  }

  return hash;
}

/**
 * Get processed string for logger prefix.
 */
function getCapitalLettersOrString(target) {
  return (target.charAt(0).toUpperCase() + target.substring(1)).replace(/[a-z]/g, "") || target.toUpperCase();
}

function log({ references, babel, state }) {
  const { types } = babel;
  const { log } = references;

  log.forEach((reference) => {
    if (types.isMemberExpression(reference.parentPath)) {
      const expression = reference.parentPath.parentPath;

      // Handle logging only in dev mode.
      if (IS_DEV) {
        const method = reference.parent.property.name;
        const args = expression.node.arguments;

        // Handle custom methods keys.
        if (method === "pushSeparator") {
          const logStatement = types.expressionStatement(
            types.callExpression(types.memberExpression(types.identifier("console"), types.identifier("info")), [
              types.stringLiteral("%c=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="),
              types.stringLiteral(PREFIX_COLOR)
            ])
          );

          expression.replaceWith(logStatement);

          return;
        }

        // Handle generic logging with prefixes.
        const fullFileName = path.basename(state.file.opts.filename);
        const onlyFileName = fullFileName.substr(0, fullFileName.lastIndexOf(".")) || fullFileName;

        const prefix = getCapitalLettersOrString(onlyFileName);
        const prefixChar = EMOJI_LIST[Math.abs(getHashCode(onlyFileName)) % EMOJI_LIST.length];

        const timeExpression = types.callExpression(
          types.memberExpression(
            types.newExpression(types.identifier("Date"), []),
            types.identifier("toLocaleTimeString")
          ),
          [types.stringLiteral("en-GB")]
        );

        const millisStringExpression = types.callExpression(
          types.memberExpression(
            types.callExpression(
              types.memberExpression(
                types.newExpression(types.identifier("Date"), []),
                types.identifier("getMilliseconds")
              ),
              []
            ),
            types.identifier("toString")
          ),
          []
        );

        const millisPaddedExpression = types.callExpression(
          types.memberExpression(millisStringExpression, types.identifier("padStart")),
          [types.numericLiteral(3), types.stringLiteral("0")]
        );

        const prefixExpression = types.callExpression(
          types.memberExpression(types.stringLiteral("%c"), types.identifier("concat")),
          [
            timeExpression,
            types.stringLiteral(":"),
            millisPaddedExpression,
            types.stringLiteral(` [${prefixChar}${prefix.padEnd(3)}]`)
          ]
        );

        const logStatement = types.expressionStatement(
          types.callExpression(types.memberExpression(types.identifier("console"), types.identifier(method)), [
            prefixExpression,
            types.stringLiteral(PREFIX_COLOR),
            ...args
          ])
        );

        expression.replaceWith(logStatement);
      } else {
        expression.remove();
      }
    } else {
      throw new Error(
        "Logging macro call is not member expression, you should access console methods from logging object."
      );
    }
  });
}

module.exports = createMacro(log);
