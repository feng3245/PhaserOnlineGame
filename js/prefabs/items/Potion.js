var RPG = RPG || {};

RPG.Potion = function (game_state, name, position, properties) {
    "use strict";
    RPG.Item.call(this, game_state, name, position, properties);
    
    this.health_power = properties.health_power;
};

RPG.Potion.prototype = Object.create(RPG.Item.prototype);
RPG.Potion.prototype.constructor = RPG.Potion;

RPG.Potion.prototype.use = function (target) {
    "use strict";
    RPG.Item.prototype.use.call(this);
    target.stats.health = Math.min(100, target.stats.health + this.health_power);
    this.game_state.game.party_data[target.name].stats.health += this.health_power;
};