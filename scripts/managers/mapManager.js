import { eventsManager } from './eventsManager.js';
import { elements } from './../elements.js';
import { userInputManager } from './userInputManager.js';
import { cameraManager } from './cameraManager.js';
import { mapConfig } from './../configs/mapConfig.js';
import { assetsManager } from './assetsManager.js';
import { resizeManager } from './resizeManager.js';

/**
 * @fileoverview manager object responsible for handling map data and drawing map
 * 
 * @author black-incendium
 */

let mapManager = (()=>{

    let callbacks = null;
    let currentMapId = "testMap1";
    let maps = {};

    function initialize() {

        setupEvents();

        createMapData();
    }

    function setupEvents() {

        eventsManager.createContext('mapManager');
        eventsManager.createEvent('mapManager', 'mapsDataReady');
    }

    function setMap(mapId) {
        
        
    }

    function drawTile(x, y) {
        
        let tileId = maps[currentMapId].data[x][y];
        let assetId = maps[currentMapId].tilesetPrefix + tileId;
        let tileX = x - cameraManager.cameraPosition.x;
        let tileY = y - cameraManager.cameraPosition.y;
        // let nextTileX = Math.floor(x - cameraManager.cameraPosition.x + 1) * cameraManager.tileSize);
        // let netxTileY = Math.floor((y - cameraManager.cameraPosition.y + 1) * cameraManager.tileSize);


        // debugger
        assetsManager.drawAsset(
            assetId, 
            tileX,
            tileY,
            1,
            1
        );

        
    }

    function drawMap() {

        

        elements.ctx.fillStyle = "#222266";
        elements.ctx.fillRect(
            0, 
            0, 
            resizeManager.gameSize.width,
            resizeManager.gameSize.height
            )
        elements.ctx.fillStyle = "red";
        elements.ctx.fillRect(userInputManager.cursorPosition.x-5, userInputManager.cursorPosition.y-5, 10, 10)
        // assetsManager.drawAsset('player_idle_0',0,0,100,100)
        drawTile(0,0)
        // drawTile(0,1)
        // drawTile(1,0)
        // drawTile(2,0)
        drawTile(1,1)
        // drawTile(3,0)
        // drawTile(4,0);
        // debugger;
    }

    function renderMap(x, y, width, height) {

        elements.ctx.fillStyle = "aqua";
        elements.ctx.fillRect(x,y,width,height);
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

    function getTilesInViewBoundaries() {

        return {
            min: {
                x: Math.floor(cameraManager.cameraPosition.x),
                y: Math.floor(cameraManager.cameraPosition.y)
            },
            max: {
                x: Math.floor(cameraManager.cameraPosition.x + cameraManager.cameraViewSize.width) + (cameraManager.cameraPosition.x % 1 == 0 ? -1 : 0),
                y: Math.floor(cameraManager.cameraPosition.y + cameraManager.cameraViewSize.height) + (cameraManager.cameraPosition.y % 1 == 0 ? -1 : 0)
            }
        }
    }

    return Object.freeze({

        initialize,
        renderMap
    });
})();

export { mapManager }