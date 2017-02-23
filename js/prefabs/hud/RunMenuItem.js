var RPG = RPG || {};

RPG.RunMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
    
    this.run_chance = properties.run_chance;
};

RPG.RunMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.RunMenuItem.prototype.constructor = RPG.RunMenuItem;

RPG.RunMenuItem.prototype.select = function () {
    "use strict";
    var random_number;
    // if random number is less than run_chance, the player succesfully avoids the battle
    random_number = this.game_state.rnd.frac();    
    if (random_number < this.run_chance) {
        // go back to WorldState
        this.game_state.game.state.start("BootState", true, false, "assets/levels/town.json", "WorldState", {});
    } else {
        // failed to run, start next turn
        this.game_state.next_turn();
    }
};