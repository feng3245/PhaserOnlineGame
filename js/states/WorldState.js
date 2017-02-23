var RPG = RPG || {};

RPG.WorldState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);
    
    this.prefab_classes = {
        "player": RPG.Player.prototype.constructor,
        "enemy_spawner": RPG.EnemySpawner.prototype.constructor,
        "door": RPG.Door.prototype.constructor,
        "npc": RPG.NPC.prototype.constructor,
        "equipment": RPG.Equipment.prototype.constructor
    };
    
    this.TEXT_STYLE = {font: "14px Kells", fill: "#FFFFFF"};
};

RPG.WorldState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.WorldState.prototype.constructor = RPG.WorldState;

RPG.WorldState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    var tileset_index;
    RPG.JSONLevelState.prototype.init.call(this, level_data, extra_parameters);
    
    // start physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;
    
    // create map and set tileset
    this.map = this.game.add.tilemap(this.level_data.map.key);
    tileset_index = 0;
    this.map.tilesets.forEach(function (tileset) {
        this.map.addTilesetImage(tileset.name, this.level_data.map.tilesets[tileset_index]);
        tileset_index += 1;
    }, this);
    
    if (extra_parameters.restart_position) {
        this.player_position = undefined;
    }
};

RPG.WorldState.prototype.preload = function () {
    "use strict";
    var enemy_encounter_name, npc_message_name, user_input_name;
    RPG.JSONLevelState.prototype.preload.call(this);
    for (enemy_encounter_name in this.level_data.enemy_encounters) {
        this.load.text(enemy_encounter_name, this.level_data.enemy_encounters[enemy_encounter_name]);
    }
    for (npc_message_name in this.level_data.npc_messages) {
        this.load.text(npc_message_name, this.level_data.npc_messages[npc_message_name]);
    }
};

RPG.WorldState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles, user_input_name;
    // create map layers before groups
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) { // collision layer
            this.map.setCollisionByExclusion([-1], true, layer.name);
        }
    }, this);
    // resize the world to be the size of the current layer
    this.layers[this.map.layer.name].resizeWorld();
    
    RPG.JSONLevelState.prototype.create.call(this);
    
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            // create layer objects
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }
    
    // if we came from BattleState, move the player to the previous position
    if (this.player_position) {
        this.prefabs.player.reset(this.player_position.x, this.player_position.y);
    }
    
    this.user_input.set_input(this.user_inputs.world_map);
};

RPG.WorldState.prototype.create_object = function (object) {
    "use strict";
    var object_y, position, prefab;
    // tiled coordinates starts in the bottom left corner
    object_y = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2);
    position = {"x": object.x + (this.map.tileHeight / 2), "y": object_y};
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(object.type)) {
        prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
    }
    this.prefabs[object.name] = prefab;
};

RPG.WorldState.prototype.open_menu = function () {
    "use strict";
    this.player_position = this.prefabs.player.position;
    this.game.state.start("BootState", false, false, "assets/levels/menu_screen.json", "MenuState", {previous_level: this.level_data.level_file});
};
