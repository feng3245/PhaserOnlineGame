var RPG = RPG || {};

RPG.Attack = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.owner = this.game_state.prefabs[properties.owner_name];
};

RPG.Attack.prototype = Object.create(RPG.Prefab.prototype);
RPG.Attack.prototype.constructor = RPG.Attack;