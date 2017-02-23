var RPG = RPG || {};

RPG.ItemMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
    
    this.item_name = properties.item_name;
    this.amount = properties.amount;
    
    this.amount_text = new RPG.TextPrefab(this.game_state, this.name + "_amount", {x: this.x + 1.5*this.width, y: this.y + 0.5*this.height}, {group: "hud", text: this.amount, style: this.game_state.TEXT_STYLE});
};

RPG.ItemMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.ItemMenuItem.prototype.constructor = RPG.ItemMenuItem;

RPG.ItemMenuItem.prototype.select = function () {
    "use strict";
    // disable items menu
    this.game_state.prefabs.items_menu.disable();
    this.game_state.prefabs.items_menu.show(false);
    // use item on current unit
    this.game_state.game.inventory.use_item(this.item_name, this.game_state.current_unit);
    // enable actions menu
    this.game_state.prefabs.actions_menu.enable();
    this.game_state.prefabs.actions_menu.show(true);
    // start next turn
    this.game_state.next_turn();
};

RPG.ItemMenuItem.prototype.show = function (show) {
    "use strict";
    RPG.MenuItem.prototype.show.call(this, show);
    this.amount_text.visible = show;
};