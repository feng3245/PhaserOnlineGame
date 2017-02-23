var RPG = RPG || {};

RPG.NPC = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.MESSAGE_BOX_POSITION = {x: 0, y: 0.75 * this.game_state.game.world.height}
    
    this.anchor.setTo(0.5);
    
    this.message = this.game_state.game.cache.getText(properties.message);
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
};

RPG.NPC.prototype = Object.create(RPG.Prefab.prototype);
RPG.NPC.prototype.constructor = RPG.NPC;

RPG.NPC.prototype.start_talk = function () {
    "use strict";
    this.message_box = new RPG.MessageBox(this.game_state, this.name + "_message_box", this.MESSAGE_BOX_POSITION, {texture: "message_box_image", group: "hud", message: this.message});
    this.game_state.user_input.set_input(this.game_state.user_inputs.talking);
};

RPG.NPC.prototype.end_talk = function () {
    "use strict";
    this.message_box.kill();
    this.game_state.user_input.set_input(this.game_state.user_inputs.world_map);
};