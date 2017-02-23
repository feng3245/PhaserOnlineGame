var RPG = RPG || {};

RPG.MenuState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);
    
    this.prefab_classes = {
        "background": RPG.Prefab.prototype.constructor,
        "menu": RPG.Menu.prototype.constructor,
        "party_menu_item": RPG.PartyMenuItem.prototype.constructor,
        "show_inventory_menu_item": RPG.ShowInventoryMenuItem.prototype.constructor,
        "unit_stats": RPG.UnitStats.prototype.constructor,
        "show_player_unit": RPG.ShowPlayerUnitInGameMenu.prototype.constructor,
        "show_player_unit_equipment": RPG.ShowPlayerUnitEquipment.prototype.constructor,
        "show_equipment_menu_item": RPG.ShowEquipmentMenuItem.prototype.constructor
    };
    
    this.TEXT_STYLE = {font: "14px Kells", fill: "#FFFFFF"};
};

RPG.MenuState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.MenuState.prototype.constructor = RPG.MenuState;

RPG.MenuState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    RPG.JSONLevelState.prototype.init.call(this, level_data, extra_parameters);
    
    this.previous_level = extra_parameters.previous_level;
};

RPG.MenuState.prototype.create = function () {
    "use strict";
    RPG.JSONLevelState.prototype.create.call(this);
    
    this.user_input.set_input(this.user_inputs.menu);
    
    this.game.inventory.create_menu(this, this.prefabs.items_menu);
    
    this.prefabs.options_menu.enable();
    
    this.prefabs.options_menu.select();
};

RPG.MenuState.prototype.close_menu = function () {
    "use strict";
    this.game.state.start("BootState", true, false, this.previous_level, "WorldState", {});
};

RPG.MenuState.prototype.move_menu = function (step) {
    "use strict";
    this.prefabs.options_menu.move_selection(this.prefabs.options_menu.current_item_index + step);
};