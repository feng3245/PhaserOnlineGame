var RPG = RPG || {};

RPG.Player = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.walking_speed = +properties.walking_speed;

    this.game_state.game.physics.arcade.enable(this);
    //this.body.setSize(16, 16, 0, 8);
    this.body.collideWorldBounds = true;
    
    this.animations.add("walking_down", [0, 4, 8, 12], 6, true);
    this.animations.add("walking_up", [1, 5, 9, 13], 6, true);
    this.animations.add("walking_left", [2, 6, 10, 14], 6, true);
    this.animations.add("walking_right", [3, 7, 11, 15], 6, true);
    
    this.stopped_frames = [0, 2, 3, 1];
    
    this.moving = {left: false, right: false, up: false, down: false};
};

RPG.Player.prototype = Object.create(RPG.Prefab.prototype);
RPG.Player.prototype.constructor = RPG.Player;

RPG.Player.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.buildings);
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.doors, this.touch_prefab, null, this);
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.npcs, this.touch_npc, null, this);
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.equipments, this.touch_equipment, null, this);
    
    if (this.moving.left && this.body.velocity.x <= 0) {
        // move left
        this.body.velocity.x = -this.walking_speed;
        if (this.body.velocity.y === 0) {
            this.animations.play("walking_left");
        }
    } else if (this.moving.right && this.body.velocity.x >= 0) {
        // move right
        this.body.velocity.x = +this.walking_speed;
        if (this.body.velocity.y === 0) {
            this.animations.play("walking_right");
        }
    } else {
        this.body.velocity.x = 0;
    }
    if (this.moving.up && this.body.velocity.y <= 0) {
        // move up
        this.body.velocity.y = -this.walking_speed;
        if (this.body.velocity.x === 0) {
            this.animations.play("walking_up");
        }
    } else if (this.moving.down && this.body.velocity.y >= 0) {
        // move down
        this.body.velocity.y = +this.walking_speed;
        if (this.body.velocity.x === 0) {
            this.animations.play("walking_down");
        }
    } else {
        this.body.velocity.y = 0;
    }
        
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        // stop current animation
        this.animations.stop();
        this.frame = this.stopped_frames[this.body.facing];
    }
};

RPG.Player.prototype.change_movement = function (direction, move) {
    "use strict";
    this.moving[direction] = move;
};
RPG.Player.prototype.touch_prefab = function(player, other_prefab){
    "use strict";
    this.touching_prefab = other_prefab;
};
RPG.Player.prototype.touch_npc = function (player, npc) {
    "use strict";
    this.touching_npc = npc;
};

RPG.Player.prototype.touch_equipment = function (player, equipment) {
    "use strict";
    this.touching_equipment = equipment;
};

RPG.Player.prototype.interact = function () {
    "use strict";
    if(this.touching_prefab){
        this.touching_prefab.interact();
    } else if (this.touching_npc) {
        this.touching_npc.start_talk();
    } else if (this.touching_equipment) {
        this.touching_equipment.collect();
    }
};

RPG.Player.prototype.end_talk = function () {
    "use strict";
    if (this.touching_npc) {
        this.touching_npc.end_talk();
    }
};
