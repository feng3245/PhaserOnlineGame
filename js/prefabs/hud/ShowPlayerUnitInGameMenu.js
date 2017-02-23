var RPG = RPG || {};

RPG.ShowPlayerUnitInGameMenu = function (game_state, name, position, properties) {
    "use strict";
    var level;
    RPG.ShowPlayerUnit.call(this, game_state, name, position, properties);
    
    this.show_unit_attack = new RPG.ShowStatWithText(this.game_state, this.name + "_attack", {x: this.x + 250, y: this.y}, {group: "hud", text: "Attack", style: properties.text_style, prefab: properties.prefab, stat: "attack"});
    
    this.show_unit_defense = new RPG.ShowStatWithText(this.game_state, this.name + "_defense", {x: this.x + 250, y: this.y + 50}, {group: "hud", text: "Defense", style: properties.text_style, prefab: properties.prefab, stat: "defense"});
    
    this.show_unit_magic_attack = new RPG.ShowStatWithText(this.game_state, this.name + "_magic_attack", {x: this.x + 400, y: this.y}, {group: "hud", text: "Magic", style: properties.text_style, prefab: properties.prefab, stat: "magic_attack"});
    
    this.show_unit_speed = new RPG.ShowStatWithText(this.game_state, this.name + "_speed", {x: this.x + 400, y: this.y + 50}, {group: "hud", text: "Speed", style: properties.text_style, prefab: properties.prefab, stat: "speed"});
    
    level = this.unit_data.current_level + 1;
    this.level_text = this.game_state.game.add.text(this.x + 130, this.y + 100, "Level: " + level, properties.text_style);
};

RPG.ShowPlayerUnitInGameMenu.prototype = Object.create(RPG.ShowPlayerUnit.prototype);
RPG.ShowPlayerUnitInGameMenu.prototype.constructor = RPG.ShowPlayerUnitInGameMenu;

RPG.ShowPlayerUnitInGameMenu.prototype.show = function (show) {
    "use strict";
    RPG.ShowPlayerUnit.prototype.show.call(this, show);
    this.show_unit_attack.show(show);
    this.show_unit_defense.show(show);
    this.show_unit_magic_attack.show(show);
    this.show_unit_speed.show(show);
    
    this.level_text.visible = show;
};