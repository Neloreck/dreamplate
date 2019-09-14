/**
 * @module @lib/utils
 */

/* tslint:disable: no-console */

/**
 * Default logger class.
 * Shows related messages with random prefix emoji and defined label.
 *
 * Minified and disabled in production mode.
 */
export class Logger {

  /* <dev> */

  private static readonly EMOJI_LIST = [
    "💀", "👽", "💩", "🔥", "✨", "🌟", "💫", "💥", "💢", "💦", "💧", "💤", "💨", "👀", "👊", "✊", "👟", "🌴", "🌲", "🌳",
    "🌰", "🌱", "🌼", "🌐", "🌙", "⛄", "🌀", "🌈", "🌊", "🎍", "🎒", "🎓", "🎏", "🎆", "🎇", "🎐", "🎑", "🎃", "🎄", "🎁",
    "🎋", "🎉", "🎊", "🎈", "🎌", "🔮", "🎥", "📷", "📹", "📼", "💿", "📀", "💽", "💾", "💻", "📱", "📠", "📡", "📺", "📻",
    "🔊", "🔉", "🔈", "🔇", "🔔", "🔕", "📢", "📣", "⏳", "⌛", "⏰", "⌚", "🔓", "🔏", "🔐", "🔑", "🔎", "💡", "🔦", "🔆",
    "🔌", "🔋", "🔍", "🛁", "🛀", "🚿", "🔧", "🔩", "🔨", "🚪", "🚬", "💣", "🔫", "🔪", "💊", "💉", "💰", "💴", "💵", "💷",
    "💶", "📋", "📅", "📆", "📇", "📁", "📂", "📌", "📎", "🔬", "🔭", "📰", "🎨", "🎬", "🎤", "🎧", "🎼", "🎵", "🎶", "🎹",
    "🎻", "🎺", "🎷", "🎸", "👾", "🎮", "🃏", "🎴", "🀄", "🎲", "🎯", "🏈", "🏀", "⚽", "⚾", "🎾", "🎱", "🏉", "🎳", "⛳",
    "🚵", "🚴", "🏁", "🏇", "🏆", "🎿", "🏂", "🏊", "🏄", "🎣", "🍵", "🍶", "🍼", "🍺", "🍻", "🍸", "🍹", "🍷", "🍴", "🍕",
    "🍔", "🍟", "🍗", "🍖", "🍝", "🍛", "🍤", "🍱", "🍣", "🍥", "🍙", "🍘", "🍚", "🍜", "🍲", "🍢", "🍡", "🍳", "🍞", "🍩",
    "🍮", "🍦", "🍨", "🍧", "🎂", "🍰", "🍪", "🍫", "🍬", "🍭", "🍯", "🍎", "🍏", "🍊", "🍋", "🍒", "🍇", "🍉", "🍓", "🍑",
    "🍈", "🍌", "🍐", "🍍", "🍠", "🍆", "🍅", "🌽"
  ];

  private readonly prefix: string = "";
  private readonly prefixSymbol: string = "";

  private readonly style: string = "color: #bada53";

  private readonly enabled: boolean = true;
  private readonly minified: boolean = true;

  /* </dev> */

  public constructor(prefix: string, enabled?: boolean) {

    /* <dev> */

    this.prefix = this.minified ? prefix.replace( /[a-z]/g, "") : prefix;
    this.prefixSymbol = Logger.EMOJI_LIST[Math.abs(this.getHashCode(prefix)) % Logger.EMOJI_LIST.length];

    if (enabled !== undefined) {
      this.enabled = enabled;
    }

    /* </dev> */
  }

  public debug(...args: Array<any>): void {

    /* <dev> */

    if (IS_DEV && this.enabled) {
      console.debug(`%c[${this.prefixSymbol}${this.prefix}]`, this.style, "[D]", ...args);
    }

    /* </dev> */
  }

  public warn(...args: Array<any>): void {

    /* <dev> */

    if (IS_DEV && this.enabled) {
      console.warn(`%c[${this.prefixSymbol}${this.prefix}]`, this.style, ...args);
    }

    /* </dev> */
  }

  public error(...args: Array<any>): void {

    /* <dev> */

    if (IS_DEV && this.enabled) {
      console.error(`%c[${this.prefixSymbol}${this.prefix}]`, this.style, ...args);
    }

    /* </dev> */
  }

  public info(...args: Array<any>): void {

    /* <dev> */

    if (IS_DEV && this.enabled) {
      console.info(`%c[${this.prefixSymbol}${this.prefix}]`, this.style, ...args);
    }

    /* </dev> */
  }

  public group(title: string): void {

    /* <dev> */

    if (IS_DEV && this.enabled) {
      console.group(`%c[${title}]`, this.style);
    }

    /* </dev> */
  }

  public groupEnd(): void {

    /* <dev> */

    if (IS_DEV && this.enabled) {
      console.groupEnd();
    }

    /* </dev> */
  }

  /**
   * Push separator to make some kind of section in console.
   */
  public pushSeparator(): void {

    /* <dev> */

    if (IS_DEV && this.enabled) {
      console.info("%c=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=", this.style);
    }

    /* </dev> */
  }

  /* <dev> */

  /**
   * Generate hashcode from string to define determined prefix indexes.
   */
  protected getHashCode(target: string): number {

    let hash = 0;

    if (target.length === 0) {
      return hash;
    }

    for (let it = 0; it < target.length; it ++) {
      hash  = ((hash << 5) - hash) + target.charCodeAt(it);
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  }

  /* </dev> */

}
