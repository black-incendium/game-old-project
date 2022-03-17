import { debug } from './../debug/debug.js';
import { assetsConfig } from './../configs/assetsConfig.js'
import { eventsManager } from './eventsManager.js';
import { cameraManager } from './cameraManager.js';
import { elements } from './../elements.js'

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
        
        setupCallbacks();
        setupEvents();
        setupEventListeners();

        createGraphics();
        createAssetsData();
    }

    function setupCallbacks() {

        callbacks = {
            
        };
    }

    function setupEvents() {

        eventsManager.createContext('assetsManager');
        eventsManager.createEvent('assetsManager', 'assetsDataReady');
    }

    function setupEventListeners() {
        
        //eventsManager.createEventListener('', '', callbacks.exampleCallback);
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

        elements.ctx.drawImage(
            graphics[assetsData[assetId].graphicsId],
            assetsData[assetId].x,
            assetsData[assetId].y,
            assetsData[assetId].width,
            assetsData[assetId].height,
            x + cameraManager.upperLeftCornerPosition.x,
            y + cameraManager.upperLeftCornerPosition.y,
            width,
            height
            );
    }

    initialize();

    return Object.freeze({

        getAssetData,
        drawAsset
    });
})();

export { assetsManager };