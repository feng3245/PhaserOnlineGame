var RPG = RPG || {};

RPG.Menu = function (game_state, name, position, properties) {
    "use strict";
    var menu_item_name, new_item;
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.visible = false;
    
    this.menu_items = [];
    for (menu_item_name in properties.menu_items) {
        new_item = this.game_state.create_prefab(menu_item_name, properties.menu_items[menu_item_name]);
        this.add_item(new_item);
    }
    
    this.current_item_index = 0;
};

RPG.Menu.prototype = Object.create(RPG.Prefab.prototype);
RPG.Menu.prototype.constructor = RPG.Menu;

RPG.Menu.prototype.add_item = function (item) {
    "use strict";
    this.menu_items.push(item);
};

RPG.Menu.prototype.move_selection = function (item_index) {
    "use strict";
    if (item_index >= 0 && item_index < this.menu_items.length) {
        this.menu_items[this.current_item_index].selection_out();
        this.current_item_index = item_index;
        this.menu_items[this.current_item_index].selection_over();
    }
};

RPG.Menu.prototype.select = function () {
    "use strict";
    this.menu_items[this.current_item_index].select();
}

RPG.Menu.prototype.find_item_index = function (name) {
    "use strict";
    var item_index;
    for (item_index = 0; item_index < this.menu_items.length; item_index += 1) {
        if (this.menu_items[item_index].name === name) {
            return item_index;
        }
    }
};

RPG.Menu.prototype.remove_item = function (index) {
    "use strict";
    var menu_item;
    menu_item = this.menu_items[index];
    // remove menu item
    this.menu_items.splice(index, 1);
    // update current_item_index if necessary
    if (this.current_item_index === index) {
        this.current_item_index = 0;
    }
    return menu_item;
};

RPG.Menu.prototype.enable = function () {
    "use strict";
    if (this.menu_items.length > 0) {
        this.menu_items[this.current_item_index].selection_out();
        this.current_item_index = 0;
        this.menu_items[this.current_item_index].selection_over();
    }
    this.game_state.current_menu = this;
};

RPG.Menu.prototype.disable = function () {
    "use strict";
    if (this.menu_items.length > 0) {
        this.menu_items[this.current_item_index].selection_out();
    }
    this.current_item_index = 0;
    this.game_state.current_menu = undefined;
};

RPG.Menu.prototype.show = function (show) {
    "use strict";
    this.menu_items.forEach(function (menu_item) {
        menu_item.show(show);
    }, this);
};