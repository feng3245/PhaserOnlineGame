var RPG = RPG || {};

RPG.EnemyMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
    
    this.scale.setTo(0.5);
    this.enemy = this.game_state.prefabs[properties.enemy_name];
};

RPG.EnemyMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.EnemyMenuItem.prototype.constructor = RPG.EnemyMenuItem;

RPG.EnemyMenuItem.prototype.select = function () {
    "use strict";
    // attack selected enemy
    this.game_state.current_attack.hit(this.enemy);
    // disable menu
    this.game_state.prefabs.enemy_units_menu.disable();
};