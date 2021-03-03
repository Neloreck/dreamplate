import { IS_PRODUCTION } from "../config";

const DEV_START: string = "<dev>";
const DEV_END: string = "</dev>";

const PRODUCTION_START: string = "<production>";
const PRODUCTION_END: string = "</production>";

const DEV_REGEX_PATTERN: RegExp = new RegExp("[\\t ]*\\/\\* ?" +
    DEV_START + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + DEV_END +
    " ?\\*\\/[\\t ]*\\n?", "g");
const PRODUCTION_REGEX_PATTERN: RegExp = new RegExp("[\\t ]*\\/\\* ?" +
    PRODUCTION_START + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + PRODUCTION_END +
    " ?\\*\\/[\\t ]*\\n?", "g");

/**
 * Strip code blocks in some project modes.
 */
function StripBlockLoader(
  this: { cacheable?: (isIt: boolean) => void },
  content: string
): string {
  content = content.replace(IS_PRODUCTION ? DEV_REGEX_PATTERN : PRODUCTION_REGEX_PATTERN, "");

  if (this.cacheable) {
    this.cacheable(true);
  }

  return content;
}

module.exports = StripBlockLoader;
