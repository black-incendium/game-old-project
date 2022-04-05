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
    let mapPosition = {};
    let mapSize = {};

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
        
        let tileId = maps[currentMapId].data?.[x]?.[y];
        if (tileId === undefined) return;

        let assetId = maps[currentMapId].tilesetPrefix + tileId;
        let assetData = assetsManager.getAssetData(assetId);

        let tileWidth = mapSize.width/cameraManager.cameraViewSize.width;
        let tileHeight = mapSize.height/cameraManager.cameraViewSize.height;

        let tileX = ((x - cameraManager.cameraPosition.x)*tileWidth + mapPosition.x);
        let tileY = ((y - cameraManager.cameraPosition.y)*tileHeight + mapPosition.y);

        let nextTileX = ((x + 1 - cameraManager.cameraPosition.x)*tileWidth + mapPosition.x);
        let nextTileY = ((y + 1 - cameraManager.cameraPosition.y)*tileHeight + mapPosition.y);

        let sourceX = assetData.x;
        let sourceY = assetData.y;
        let sourceWidth = assetData.width;
        let sourceHeight = assetData.height;

        if (x < cameraManager.cameraPosition.x) {

            sourceX = (cameraManager.cameraPosition.x - x) * assetData.width + assetData.x;
            sourceWidth = assetData.width - ((cameraManager.cameraPosition.x - x) * assetData.width);
            tileX = mapPosition.x
        } 

        if (y < cameraManager.cameraPosition.y) {

            sourceY = (cameraManager.cameraPosition.y - y) * assetData.height + assetData.y;
            sourceHeight = assetData.height - ((cameraManager.cameraPosition.y - y) * assetData.height);
            tileY = mapPosition.y
        } 

        if (x + 1 > cameraManager.cameraPosition.x + cameraManager.cameraViewSize.width) {

            sourceWidth = (cameraManager.cameraViewSize.width - (x - cameraManager.cameraPosition.x)) * assetData.width;
            nextTileX = mapPosition.x + mapSize.width;
        }

        if (y + 1 > cameraManager.cameraPosition.y + cameraManager.cameraViewSize.height) {

            sourceHeight = (cameraManager.cameraViewSize.height - (y - cameraManager.cameraPosition.y)) * assetData.height;
            nextTileY = mapPosition.y + mapSize.height;
        }
        
        // elements.ctx.fillStyle = "black";
        // elements.ctx.fillRect(tileX, tileY, 90,90)

        elements.ctx.drawImage(
            assetsManager.getAsset(assetData.graphicsId),
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            Math.floor(tileX),
            Math.floor(tileY),
            Math.floor(nextTileX) - Math.floor(tileX),
            Math.floor(nextTileY) - Math.floor(tileY),
            // nextTileX - tileX,
            // nextTileY - tileY
        );

        // console.log(Math.ceil(tileWidth))
        if (x==1 && y==1) {
            // console.log(nextTileX - tileX, nextTileY - tileY)
        }
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
        // drawTile(1,1)
        // drawTile(3,0)
        // drawTile(4,0);
        // debugger;
    }

    function renderMap(x, y, width, height) {

        mapPosition.x = x;
        mapPosition.y = y;
        mapSize.width = width;
        mapSize.height = height;

        elements.ctx.fillStyle = "aqua";
        elements.ctx.fillRect(x,y,width,height);

        let tilesInViewBoundaries = getTilesInViewBoundaries();

        for (let i=tilesInViewBoundaries.min.x; i<=tilesInViewBoundaries.max.x; i++) {
            for (let j=tilesInViewBoundaries.min.y; j<=tilesInViewBoundaries.max.y; j++) {

                drawTile(i, j)
            }
        }

        if (cameraManager.cameraPosition.x > 10) return

        cameraManager.setCameraPosition(
            cameraManager.cameraPosition.x+0.05,
            cameraManager.cameraPosition.y+0.0,
        )
    }
    
    function testRender(x, y, width, height) {
        
        elements.ctx.fillStyle = "darkblue";
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
        renderMap,
        testRender
    });
})();

export { mapManager }