/* tslint:disable: no-console */

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

  private static readonly IS_DEV: boolean = process.env.NODE_ENV === "development";

  /* </dev> */

  private readonly prefix: string = "LOG";
  private readonly prefixSymbol: string = "X-";
  private readonly enabled: boolean = true;
  private readonly minified: boolean = true;

  public constructor(prefix: string, enabled?: boolean) {

    /* <dev> */

    this.prefix = this.minified ? prefix.replace( /[a-z]/g, "") : prefix;
    this.prefixSymbol = Logger.EMOJI_LIST[Math.abs(this.hashCode(prefix)) % Logger.EMOJI_LIST.length];

    if (enabled !== undefined) {
      this.enabled = enabled;
    }

    /* </dev> */
  }

  public getPrefixed(prefix: string, enabled?: boolean): Logger {
    return new Logger(this.prefix + " @ " + prefix, enabled);
  }

  public debug(...args: Array<any>): void {

    /* <dev> */

    if (Logger.IS_DEV && this.enabled) {
      console.debug(`%c[${this.prefixSymbol}${this.prefix}]`, "color: #bada53", "[D]", ...args);
    }

    /* </dev> */
  }

  public warn(...args: Array<any>): void {

    /* <dev> */

    if (Logger.IS_DEV && this.enabled) {
      console.warn(`%c[${this.prefixSymbol}${this.prefix}]`, "color: #bada53", ...args);
    }

    /* </dev> */
  }

  public error(...args: Array<any>): void {
    console.error(`%c[${this.prefixSymbol}${this.prefix}]`, "color: #bada53", ...args);
  }

  public info(...args: Array<any>): void {

    /* <dev> */

    if (Logger.IS_DEV && this.enabled) {
      console.info(`%c[${this.prefixSymbol}${this.prefix}]`, "color: #bada53", ...args);
    }

    /* </dev> */
  }

  public pushSeparator(): void {

    /* <dev> */

    if (Logger.IS_DEV && this.enabled) {
      console.info("%c=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=", "color: #bada53");
    }

    /* </dev> */
  }

  protected hashCode(target: string): number {

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

}
