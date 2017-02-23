var RPG = RPG || {};

RPG.ShowEquipmentMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.TextMenuItem.call(this, game_state, name, position, properties);
};

RPG.ShowEquipmentMenuItem.prototype = Object.create(RPG.TextMenuItem.prototype);
RPG.ShowEquipmentMenuItem.prototype.constructor = RPG.ShowEquipmentMenuItem;

RPG.ShowEquipmentMenuItem.prototype.select = function () {
    "use strict";
    this.game_state.prefabs.items_menu.show(false);
    this.game_state.prefabs.show_warrior_unit.show(false);
    this.game_state.prefabs.show_mage_unit.show(false);
    this.game_state.prefabs.show_warrior_equipment.show(true);
    this.game_state.prefabs.show_mage_equipment.show(true);
};