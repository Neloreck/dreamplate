import { IS_PRODUCTION } from "../config";

/*
 * Trim code from webpack bundle based on ENV mode.
 */
function StripBlockLoader(content: any): any {

  const devStartComment: string = "<dev>";
  const devEndComment: string = "</dev>";

  const productionStartComment: string = "<production>";
  const productionEndComment: string = "</production>";

  const devRegexPattern: RegExp = new RegExp("[\\t ]*\\/\\* ?" + devStartComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + devEndComment + " ?\\*\\/[\\t ]*\\n?", "g");
  const productionRegexPattern: RegExp = new RegExp("[\\t ]*\\/\\* ?" + productionStartComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + productionEndComment + " ?\\*\\/[\\t ]*\\n?", "g");

  content = content.replace(IS_PRODUCTION ? devRegexPattern : productionRegexPattern, "");

  // @ts-ignore
  if (this.cacheable) {
    // @ts-ignore
    this.cacheable(true);
  }

  return content;
}

module.exports = StripBlockLoader;
