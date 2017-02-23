var RPG = RPG || {};

RPG.ShowStat = function (game_state, name, position, properties) {
    "use strict";
    RPG.TextPrefab.call(this, game_state, name, position, properties);
    
    this.unit_data = this.game_state.game.party_data[properties.prefab];
    this.stat = properties.stat;
};

RPG.ShowStat.prototype = Object.create(RPG.TextPrefab.prototype);
RPG.ShowStat.prototype.constructor = RPG.ShowStat;

RPG.ShowStat.prototype.update = function () {
    "use strict";
    this.current_stat = this.unit_data.stats[this.stat] + this.unit_data.stats_bonus[this.stat];
};

RPG.ShowStat.prototype.show = function (show) {
    "use strict";
    this.visible = show;
};