/**
 * @module initialization
 *
 * Inline initialization script root.
 * Used as first-priority executed scripts in html file.
 */

import { initTheme } from "@Application/initialization/initTheme";
import { logInitInfo } from "@Application/initialization/logInitInfo";

/* <dev> */

logInitInfo();

/* </dev> */

/* <everything> */

initTheme();

/* </everything> */
