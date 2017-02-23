var RPG = RPG || {};

RPG.ShowInventoryMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.TextMenuItem.call(this, game_state, name, position, properties);
};

RPG.ShowInventoryMenuItem.prototype = Object.create(RPG.TextMenuItem.prototype);
RPG.ShowInventoryMenuItem.prototype.constructor = RPG.ShowInventoryMenuItem;

RPG.ShowInventoryMenuItem.prototype.select = function () {
    "use strict";
    this.game_state.prefabs.show_warrior_unit.show(false);
    this.game_state.prefabs.show_mage_unit.show(false);
    this.game_state.prefabs.items_menu.show(true);
    this.game_state.prefabs.show_warrior_equipment.show(false);
    this.game_state.prefabs.show_mage_equipment.show(false);
};