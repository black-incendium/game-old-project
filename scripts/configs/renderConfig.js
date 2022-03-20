import { mapManager } from "../managers/mapManager.js"

let renderConfig = {
    renderFunctions: {
        'map': mapManager.renderMap,
        'test': mapManager.testRender
    }
}

export { renderConfig }