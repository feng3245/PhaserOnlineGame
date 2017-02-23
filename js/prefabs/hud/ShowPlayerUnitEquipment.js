var RPG = RPG || {};

RPG.ShowPlayerUnitEquipment = function (game_state, name, position, properties) {
    "use strict";
    var level;
    RPG.ShowPlayerUnit.call(this, game_state, name, position, properties);
    
    this.prefab_equipments = this.game_state.game.party_data[properties.prefab].equipment;
    
    this.show_equipment = [];
    
    this.show_unit_head = new RPG.ShowEquipment(this.game_state, this.name + "_head", {x: this.x + 250, y: this.y}, {group: "hud", text: "Head", style: properties.text_style, equipment_texture: this.prefab_equipments.head.texture});
    this.show_equipment.push(this.show_unit_head);

    this.show_unit_body = new RPG.ShowEquipment(this.game_state, this.name + "_body", {x: this.x + 250, y: this.y + 50}, {group: "hud", text: "Body", style: properties.text_style, equipment_texture: this.prefab_equipments.body.texture});
    this.show_equipment.push(this.show_unit_body);
        
    this.show_unit_legs = new RPG.ShowEquipment(this.game_state, this.name + "_head", {x: this.x + 400, y: this.y}, {group: "hud", text: "Legs", style: properties.text_style, equipment_texture: this.prefab_equipments.legs.texture});
    this.show_equipment.push(this.show_unit_legs);

    this.show_unit_feet = new RPG.ShowEquipment(this.game_state, this.name + "_body", {x: this.x + 400, y: this.y + 50}, {group: "hud", text: "Feet", style: properties.text_style, equipment_texture: this.prefab_equipments.feet.texture});
    this.show_equipment.push(this.show_unit_feet);    
};

RPG.ShowPlayerUnitEquipment.prototype = Object.create(RPG.ShowPlayerUnit.prototype);
RPG.ShowPlayerUnitEquipment.prototype.constructor = RPG.ShowPlayerUnitEquipment;

RPG.ShowPlayerUnitEquipment.prototype.show = function (show) {
    "use strict";
    RPG.ShowPlayerUnit.prototype.show.call(this, show);
    this.show_equipment.forEach(function(show_equipment) {
        show_equipment.show(show);
    }, this);
};