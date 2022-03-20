import { gameManager } from "./managers/gameManager.js";
import { exposedManagers } from "./development/exposedManagers.js";

window.managers = exposedManagers;
gameManager.initialize();