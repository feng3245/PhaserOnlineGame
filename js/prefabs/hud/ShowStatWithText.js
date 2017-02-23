var RPG = RPG || {};

RPG.ShowStatWithText = function (game_state, name, position, properties) {
    "use strict";
    RPG.ShowStat.call(this, game_state, name, position, properties);
   
    this.value_text = this.game_state.game.add.text(this.x, this.y + 20, this.unit_data.stats[this.stat], properties.style);
};

RPG.ShowStatWithText.prototype = Object.create(RPG.ShowStat.prototype);
RPG.ShowStatWithText.prototype.constructor = RPG.ShowStatWithText;

RPG.ShowStatWithText.prototype.update = function () {
    "use strict";
    RPG.ShowStat.prototype.update.call(this);
    this.value_text.text = this.current_stat;
};

RPG.ShowStatWithText.prototype.show = function (show) {
    "use strict";
    RPG.ShowStat.prototype.show.call(this, show);
    this.value_text.visible = show;
};