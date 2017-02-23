var RPG = RPG || {};

RPG.Equipment = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.texture_name = properties.texture;
    if(this.scale)
    this.scale.setTo(0.3, 0.3);
    
    this.unit_name = properties.unit_name;
    this.body_part = properties.body_part;
    this.stat = properties.stat;
    this.bonus = properties.bonus;
    
    this.game_state.game.physics.arcade.enable(this);
    if(this.body)
    this.body.immovable = true;
};

RPG.Equipment.prototype = Object.create(RPG.Prefab.prototype);
RPG.Equipment.prototype.constructor = RPG.Equipment;

RPG.Equipment.prototype.collect = function () {
    "use strict";
    var unit_data;
    unit_data = this.game_state.game.party_data[this.unit_name];
    if (!unit_data.equipment[this.body_part] || unit_data.equipment[this.body_part].name !== this.name) {
        unit_data.equipment[this.body_part] = {name: this.name, texture: this.texture_name};
        unit_data.stats_bonus[this.stat] = this.bonus;
        this.kill();
    }
    
    firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/party_data").set(this.game_state.game.party_data);
};