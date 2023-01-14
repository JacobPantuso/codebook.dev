import * as modules from './modules.js';

document.body.addEventListener('keyup', function (e) {
    if (e.key == "Escape") {
        modules.hideSetting();
    }
});