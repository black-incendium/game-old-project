import { mapManager } from "../managers/mapManager.js"

let renderConfig = {
    renderFunctions: {
        'map': mapManager.renderMap
    }
}

export { renderConfig }