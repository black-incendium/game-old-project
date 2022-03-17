import { eventsManager } from './eventsManager.js';
import { elements } from './../elements.js';
import { userInputManager } from './userInputManager.js';
import { cameraManager } from './cameraManager.js';
import { mapConfig } from './../configs/mapConfig.js';
import { assetsManager } from './assetsManager.js';

/**
 * @fileoverview manager object responsible for handling map data and drawing map
 * 
 * @author black-incendium
 */

let mapManager = (()=>{

    let callbacks = null;
    let actualMapId = "";
    let maps = {}

    function initialize() {

        setupCallbacks();
        setupEvents();
        setupEventListeners();

        createMapData();
    }

    function setupCallbacks() {

        callbacks = {
            
        };
    }

    function setupEvents() {

        eventsManager.createContext('mapManager');
        eventsManager.createEvent('mapManager', 'mapsDataReady');
    }

    function setupEventListeners() {

    }

    function setMap(mapId) {
        
        
    }

    function drawTile(x, y) {
        
        let tileId = maps[actualMapId].mapData[x][y]
    }

    function drawMap() {

        elements.ctx.fillStyle = "#222266";
        elements.ctx.fillRect(
            cameraManager.upperLeftCornerPosition.x, 
            cameraManager.upperLeftCornerPosition.y, 
            cameraManager.gameSize.width,
            cameraManager.gameSize.height
            )
        elements.ctx.fillStyle = "red";
        elements.ctx.fillRect(userInputManager.cursorPosition.x-5, userInputManager.cursorPosition.y-5, 10, 10)
        assetsManager.drawAsset('player_idle_0',0,0,100,100)
    }

    async function createMapData() {

        await Promise.all(mapConfig.mapsJsons.map(async jsonName => {

            let response = await fetch(`./../../assets/mapsJsons/${jsonName}`)
            response = await response.json();

            console.log(response);

            maps[response.name] = {};
            maps[response.name].tilesetPrefix = response.tilesetPrefix;
            maps[response.name].tiles = response.tiles;
            maps[response.name].entities = response.entities;

        }));     
        eventsManager.fireEvent('mapManager', 'mapsDataReady');
    }

    initialize();

    return Object.freeze({

        drawMap
    });
})();

export { mapManager }