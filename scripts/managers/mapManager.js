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
    let currentMapId = "testMap1";
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
        
        let tileId = maps[currentMapId].data[x][y];
        let assetId = maps[currentMapId].tilesetPrefix + tileId;
        let tileX = Math.floor((x - cameraManager.cameraPosition.x) * cameraManager.tileSize);
        let tileY = Math.floor((y - cameraManager.cameraPosition.y) * cameraManager.tileSize);
        let nextTileX = Math.floor((x - cameraManager.cameraPosition.x + 1) * cameraManager.tileSize);
        let netxTileY = Math.floor((y - cameraManager.cameraPosition.y + 1) * cameraManager.tileSize);

        assetsManager.drawAsset(
                assetId, 
                tileX,
                tileY,
                nextTileX - tileX,
                netxTileY - tileY
            );
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
        // assetsManager.drawAsset('player_idle_0',0,0,100,100)
        drawTile(0,0)
        drawTile(0,1)
        drawTile(1,0)
        drawTile(2,0)
        drawTile(1,1)
        drawTile(3,0)
        drawTile(4,0)
    }

    async function createMapData() {

        await Promise.all(mapConfig.mapsJsons.map(async jsonName => {

            let response = await fetch(`./../../assets/mapsJsons/${jsonName}`)
            response = await response.json();

            maps[response.name] = {};
            maps[response.name].tilesetPrefix = response.tilesetPrefix;
            maps[response.name].data = response.data;
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