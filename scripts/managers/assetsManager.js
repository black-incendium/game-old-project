import { debug } from './../debug/debug.js';
import { assetsConfig } from './../configs/assetsConfig.js'
import { eventsManager } from './eventsManager.js';
import { cameraManager } from './cameraManager.js';
import { elements } from './../elements.js'
import { resizeManager } from './resizeManager.js';

/**
 * @fileoverview manager object responsible for handling (creating, saving, etc.) assets data
 * 
 * @author black-incendium
 */

 let assetsManager = (() => {

    let callbacks = null;
    let assetsData = {};
    let graphics = {};

    function initialize() {
        
        setupEvents();

        createGraphics();
        createAssetsData();
    }

    function setupEvents() {

        eventsManager.createContext('assetsManager');
        eventsManager.createEvent('assetsManager', 'assetsDataReady');
    }

    async function createAssetsData() {

        await Promise.all(assetsConfig.imagesJsons.map(async jsonName => {
            let response = await fetch(`./../../assets/imagesJsons/${jsonName}`);
            response = await response.json();
            response.frames.forEach((frame, index) => {

                let optionalFrameName;
                let additionalFrameData = {};

                if (response.prefix) {
                    optionalFrameName = response.prefix + index;
                }
                    
                if (assetsData[optionalFrameName ?? frame.name] !== undefined) {
                    debug.msg(`asset ${optionalFrameName ?? frame.name} already exists`);
                }

                additionalFrameData.graphicsId = response.graphicsId;
                assetsData[optionalFrameName ?? frame.name] = {...frame, ...additionalFrameData}
            });
        }));
        eventsManager.fireEvent('assetsManager', 'assetsDataReady');
    }

    function createGraphics() {

        Object.getOwnPropertyNames(assetsConfig.images).forEach(property => {

            graphics[property] = new Image();
            graphics[property].src = `./assets/images/${assetsConfig.images[property]}`;
        });
    }

    function getAssetData(assetName) {

        return assetsData[assetName];
    }

    function drawAsset(assetId, x, y, width, height) {
        
        let tileSize = resizeManager.gameSize.width/cameraManager.cameraAspectRatio.width;

        elements.ctx.drawImage(
            graphics[assetsData[assetId].graphicsId],
            assetsData[assetId].x,
            assetsData[assetId].y,
            assetsData[assetId].width,
            assetsData[assetId].height,
            x * tileSize,
            y * tileSize,
            width * tileSize,
            height * tileSize
        );
    }

    return Object.freeze({

        initialize,
        getAssetData,
        drawAsset
    });
})();

export { assetsManager };