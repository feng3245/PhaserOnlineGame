var RPG = RPG || {};

RPG.ShowEquipment = function (game_state, name, position, properties) {
    "use strict";
    RPG.TextPrefab.call(this, game_state, name, position, properties);
   
    this.equipment_sprite = this.game_state.game.add.sprite(this.x, this.y + 20, properties.equipment_texture);
    this.equipment_sprite.scale.setTo(0.3, 0.3);
};

RPG.ShowEquipment.prototype = Object.create(RPG.TextPrefab.prototype);
RPG.ShowEquipment.prototype.constructor = RPG.ShowEquipment;

RPG.ShowEquipment.prototype.show = function (show) {
    "use strict";
    this.visible = show;
    this.equipment_sprite.visible = show;
};