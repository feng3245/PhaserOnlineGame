var RPG = RPG || {};

RPG.Inventory = function () {
    "use strict";    
    this.item_classes = {
        "potion": RPG.Potion.prototype.constructor
    };

    this.items = {};
};

RPG.Inventory.prototype.create_menu = function (game_state, items_menu) {
    "use strict";
    var item_position, item_type, item_prefab, item_amount, menu_item;
    // create units menu items
    item_position = new Phaser.Point(items_menu.x, items_menu.y);
    for (item_type in this.items) {
        item_prefab = this.items[item_type].prefab;
        item_amount = this.items[item_type].amount;
        menu_item = new RPG.ItemMenuItem(game_state, item_type + "_menu_item", {x: item_position.x, y: item_position.y}, {group: "hud", texture: item_prefab.item_texture, item_name: item_type, amount: item_amount});
        items_menu.add_item(menu_item);
    }
    items_menu.show(false);
};

RPG.Inventory.prototype.collect_item = function (game_state, item_object, add_to_database) {
    "use strict";
    var item;
    if (this.items[item_object.type]) {
        this.items[item_object.type].amount += 1;
    } else {
        item = new this.item_classes[item_object.type](game_state, item_object.type, {x: 0, y: 0}, item_object.properties);
        this.items[item_object.type] = item;
        this.items[item_object.type].prefab = item;
        this.items[item_object.type].amount = 1;
        this.items[item_object.type].use = item.use;
    }
    
    if (add_to_database) {
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/items").push(item_object);
    }
};

RPG.Inventory.prototype.use_item = function (item_type, target) {
    "use strict";
    if (this.items[item_type].amount > 0) {
        this.items[item_type].use(target);
        this.items[item_type].amount -= 1;
    }
};