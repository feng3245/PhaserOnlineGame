var RPG = RPG || {};

RPG.TextMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.TextPrefab.call(this, game_state, name, position, properties);
};

RPG.TextMenuItem.prototype = Object.create(RPG.TextPrefab.prototype);
RPG.TextMenuItem.prototype.constructor = RPG.TextMenuItem;

RPG.TextMenuItem.prototype.selection_over = function () {
    "use strict";
    this.fill = "#FFFF00";
};

RPG.TextMenuItem.prototype.selection_out = function () {
    "use strict";
    this.fill = "#FFFFFF";
};