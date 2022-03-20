import { cameraManager } from './../managers/cameraManager.js';
import { renderManager } from './../managers/renderManager.js';
import { eventsManager } from './../managers/eventsManager.js';
import { gameManager } from './../managers/gameManager.js';
import { gameQueueManager } from './../managers/gameQueueManager.js';
import { mapManager } from './../managers/mapManager.js';
import { resizeManager } from './../managers/resizeManager.js';
import { userInputManager } from './../managers/userInputManager.js';
import { entitiesManager } from './../managers/entitiesManager.js';
import { assetsManager } from './../managers/assetsManager.js';
import { animationsManager } from './../managers/animationsManager.js';
import { componentsManager } from '../managers/componentsManager.js';

import { testManager } from './testManager.js';

let exposedManagers = {
    cameraManager,
    renderManager,
    eventsManager,
    gameManager,
    gameQueueManager,
    mapManager,
    resizeManager,
    userInputManager,
    entitiesManager,
    assetsManager,
    animationsManager,
    componentsManager,
    
    testManager
}

export { exposedManagers }