var RPG = RPG || {};

RPG.PlayerUnit = function (game_state, name, position, properties) {
    "use strict";
    RPG.Unit.call(this, game_state, name, position, properties);
    
    this.face_texture = properties.face_texture;
    
    this.anchor.setTo(0.5);
};

RPG.PlayerUnit.prototype = Object.create(RPG.Unit.prototype);
RPG.PlayerUnit.prototype.constructor = RPG.PlayerUnit;

RPG.PlayerUnit.prototype.act = function () {
    "use strict";
    var unit_index, player_units_menu_items;
    // show the current unit in the HUD
    this.game_state.prefabs.show_player_unit.change_current_unit(this.name, this.face_texture);
    
    // enable menu for choosing the action
    this.game_state.prefabs.actions_menu.enable();
};

RPG.PlayerUnit.prototype.receive_experience = function (experience) {
    "use strict";
    var next_level_data, stat;
    // increase experience
    this.experience += experience;
    next_level_data = this.game_state.experience_table[this.current_level];
    // if current experience is greater than the necessary to the next level, the unit gains a level
    if (this.experience >= next_level_data.required_exp) {
        this.current_level += 1;
        this.experience = 0;
        // increase unit stats according to new level
        for (stat in next_level_data.stats_increase) {
            if (next_level_data.stats_increase.hasOwnProperty(stat)) {
                this.stats[stat] += next_level_data.stats_increase[stat];
            }
        }
    }
};