var RPG = RPG || {};

RPG.JSONLevelState = function () {
    "use strict";
    Phaser.State.call(this);
    
    this.prefab_classes = {

    };
};

RPG.JSONLevelState.prototype = Object.create(Phaser.State.prototype);
RPG.JSONLevelState.prototype.constructor = RPG.JSONLevelState;

RPG.JSONLevelState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    this.level_data = level_data;
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};

RPG.JSONLevelState.prototype.preload = function () {
    "use strict";
    var user_input_name;
    
    for (user_input_name in this.level_data.user_inputs) {
        this.load.text(user_input_name, this.level_data.user_inputs[user_input_name]);
    }
};

RPG.JSONLevelState.prototype.create = function () {
    "use strict";
    var group_name, prefab_name, player_unit_name, enemy_unit_name, user_input_name;
    
    // create groups
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    // create prefabs
    this.prefabs = {};
    for (prefab_name in this.level_data.prefabs) {
        if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
            // create prefab
            this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]);
        }
    }    
    
    this.user_inputs = {};
    for (user_input_name in this.level_data.user_inputs) {
        this.user_inputs[user_input_name] = JSON.parse(this.game.cache.getText(user_input_name));
    }
    
    this.user_input = this.game.plugins.add(RPG.UserInput, this);
};

RPG.JSONLevelState.prototype.create_prefab = function (prefab_name, prefab_data) {
    "use strict";
    var prefab;
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, Object.create(prefab_data.properties));
    }
    return prefab;
};