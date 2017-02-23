var RPG = RPG || {};

RPG.ShowStatWithBar = function (game_state, name, position, properties) {
    "use strict";
    RPG.ShowStat.call(this, game_state, name, position, properties);
    
    this.bar_sprite = this.game_state.game.add.sprite(this.x, this.y + 20, properties.bar_texture);
};

RPG.ShowStatWithBar.prototype = Object.create(RPG.ShowStat.prototype);
RPG.ShowStatWithBar.prototype.constructor = RPG.ShowStatWithBar;

RPG.ShowStatWithBar.prototype.update = function () {
    "use strict";
    RPG.ShowStat.prototype.update.call(this);
    this.bar_sprite.scale.setTo(this.current_stat / 100, 1.0);
};

RPG.ShowStatWithBar.prototype.show = function (show) {
    "use strict";
    RPG.ShowStat.prototype.show.call(this, show);
    this.bar_sprite.visible = show;
};