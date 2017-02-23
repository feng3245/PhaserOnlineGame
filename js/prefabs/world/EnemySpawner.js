var RPG = RPG || {};

RPG.EnemySpawner = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.encounter = properties.encounter;
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
    
    this.overlapping = true;
};

RPG.EnemySpawner.prototype = Object.create(RPG.Prefab.prototype);
RPG.EnemySpawner.prototype.constructor = RPG.EnemySpawner;

RPG.EnemySpawner.prototype.update = function () {
    "use strict";
    this.overlapping = this.game_state.game.physics.arcade.collide(this, this.game_state.groups.players, this.check_for_spawn, null, this);
};

RPG.EnemySpawner.prototype.check_for_spawn = function () {
    "use strict";
    var spawn_chance, encounter_index, enemy_encounter;
    // check for spawn only once for overlap
    if (!this.overlapping) {
        // save current player position for later
        this.game_state.player_position = this.game_state.prefabs.player.position;
        
        // start BattleState for new enemy encounter
        enemy_encounter = JSON.parse(this.game_state.game.cache.getText(this.encounter));
        this.game_state.game.state.start("BootState", false, false, "assets/levels/battle.json", "BattleState", {encounter: enemy_encounter, previous_level: this.game_state.level_data.level_file});
    }
};