var RPG = RPG || {};

RPG.PartyMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.TextMenuItem.call(this, game_state, name, position, properties);
};

RPG.PartyMenuItem.prototype = Object.create(RPG.TextMenuItem.prototype);
RPG.PartyMenuItem.prototype.constructor = RPG.PartyMenuItem;

RPG.PartyMenuItem.prototype.select = function () {
    "use strict";
    this.game_state.prefabs.items_menu.show(false);
    this.game_state.prefabs.show_warrior_unit.show(true);
    this.game_state.prefabs.show_mage_unit.show(true);
    this.game_state.prefabs.show_warrior_equipment.show(false);
    this.game_state.prefabs.show_mage_equipment.show(false);
};