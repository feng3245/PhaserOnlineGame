var RPG = RPG || {};

RPG.MenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
};

RPG.MenuItem.prototype = Object.create(RPG.Prefab.prototype);
RPG.MenuItem.prototype.constructor = RPG.MenuItem;

RPG.MenuItem.prototype.selection_over = function () {
    "use strict";
    this.tint = 0xff0000;
};

RPG.MenuItem.prototype.selection_out = function () {
    "use strict";
    this.tint = 0xffffff;
};

RPG.MenuItem.prototype.show = function (show) {
    "use strict";
    this.visible = show;
};