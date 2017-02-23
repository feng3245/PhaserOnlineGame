var RPG = RPG || {};

RPG.BattleState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);
    
    this.prefab_classes = {
        "background": RPG.Prefab.prototype.constructor,
        "rectangle": RPG.Prefab.prototype.constructor,
        "player_unit": RPG.PlayerUnit.prototype.constructor,
        "enemy_unit": RPG.EnemyUnit.prototype.constructor,
        "boss_unit": RPG.BossUnit.prototype.constructor,
        "inventory": RPG.Inventory.prototype.constructor,
        "menu": RPG.Menu.prototype.constructor,
        "attack_menu_item": RPG.AttackMenuItem.prototype.constructor,
        "magic_attack_menu_item": RPG.MagicAttackMenuItem.prototype.constructor,
        "inventory_menu_item": RPG.InventoryMenuItem.prototype.constructor,
        "run_menu_item": RPG.RunMenuItem.prototype.constructor,
        "item_menu_item": RPG.ItemMenuItem.prototype.constructor,
        "show_player_unit": RPG.ShowPlayerUnit.prototype.constructor
    };
    
    this.TEXT_STYLE = {font: "14px Kells", fill: "#FFFFFF"};
};

RPG.BattleState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.BattleState.prototype.constructor = RPG.BattleState;

RPG.BattleState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    RPG.JSONLevelState.prototype.init.call(this, level_data, extra_parameters);
    
    this.encounter = extra_parameters.encounter;
    this.previous_level = extra_parameters.previous_level;
};

RPG.BattleState.prototype.preload = function () {
    "use strict";
    RPG.JSONLevelState.prototype.preload.call(this);
    this.load.text("experience_table", "assets/levels/experience_table.json");
};

RPG.BattleState.prototype.create = function () {
    "use strict";
    var player_unit_name, enemy_unit_name, unit_data, stats_bonus, stat_name;
    RPG.JSONLevelState.prototype.create.call(this);
    
    // create enemy units
    for (enemy_unit_name in this.encounter.enemy_data) {
        // create enemy units
        this.create_prefab(enemy_unit_name, this.encounter.enemy_data[enemy_unit_name]);
    }
    
    // create player units
    for (player_unit_name in this.game.party_data) {
        unit_data = this.game.party_data[player_unit_name];
        stats_bonus = this.game.party_data[player_unit_name].stats_bonus;
        this.prefabs[player_unit_name].stats = {};
        for (stat_name in unit_data.stats) {
            this.prefabs[player_unit_name].stats[stat_name] = unit_data.stats[stat_name] + stats_bonus[stat_name];
        }
        
        this.prefabs[player_unit_name].experience = unit_data.experience;
        this.prefabs[player_unit_name].current_level = unit_data.current_level;
    }
    
    // save experience table
    this.experience_table = JSON.parse(this.game.cache.getText("experience_table"));
    
    this.init_hud();
    
    // store units in a priority queue which compares the units act turn
    this.units = new PriorityQueue({comparator: function (unit_a, unit_b) {
        return unit_a.act_turn - unit_b.act_turn;
    }});
    this.groups.player_units.forEach(function (unit) {
        unit.calculate_act_turn(0);
        this.units.queue(unit);
    }, this);
    this.groups.enemy_units.forEach(function (unit) {
        unit.calculate_act_turn(0);
        this.units.queue(unit);
    }, this);
    
    this.next_turn();

    this.user_input.set_input(this.user_inputs.battle);
};

RPG.BattleState.prototype.init_hud = function () {
    "use strict";
    var unit_index, player_unit_health;
    
    // show enemy units
    this.show_enemy_units("enemy_units", RPG.EnemyMenuItem.prototype.constructor);
    
    // create items menu
    this.game.inventory.create_menu(this, this.prefabs.items_menu);
};

RPG.BattleState.prototype.show_enemy_units = function (group_name, menu_item_constructor) {
    "use strict";
    var unit_index, unit_menu_item, units_menu;

    units_menu = this.prefabs[group_name + "_menu"];
    
    // create units menu items
    unit_index = 0;
    this.groups[group_name].forEach(function (unit) {
        unit_menu_item = new menu_item_constructor(this, unit.name + "_menu_item", {x: units_menu.x + unit_index * 50, y: units_menu.y}, {group: "hud", texture: unit.face_texture, enemy_name: unit.name});
        unit_index += 1;
        units_menu.add_item(unit_menu_item);
    }, this);
};

RPG.BattleState.prototype.next_turn = function () {
    "use strict";
    // if all enemy units are dead, go back to the world state
    if (this.groups.enemy_units.countLiving() === 0) {
        this.end_battle();
    }
    
    // if all player units are dead, restart the game
    if (this.groups.player_units.countLiving() === 0) {
        this.game_over();
    }
    
    // takes the next unit
    this.current_unit = this.units.dequeue();
    // if the unit is alive, it acts, otherwise goes to the next turn
    if (this.current_unit.alive) {
        this.current_unit.act();
        this.current_unit.calculate_act_turn(this.current_unit.act_turn);
        this.units.queue(this.current_unit);
    } else {
        this.next_turn();
    }
};

RPG.BattleState.prototype.game_over = function () {
    "use strict";
    // go back to WorldState restarting the player position
    this.game.state.start("BootState", true, false, this.previous_level, "WorldState", {restart_position: true});
};

RPG.BattleState.prototype.end_battle = function () {
    "use strict";
    var received_experience;
    
    // receive battle reward
    received_experience = this.encounter.reward.experience;
    this.groups.player_units.forEach(function (player_unit) {
        // receive experience from enemy
        player_unit.receive_experience(received_experience / this.groups.player_units.children.length);
        // save current party stats
        this.game.party_data[player_unit.name].stats = player_unit.stats;
        this.game.party_data[player_unit.name].experience = player_unit.experience;
        this.game.party_data[player_unit.name].current_level = player_unit.current_level;
    }, this);
    
    this.encounter.reward.items.forEach(function (item_object) {
        this.game.inventory.collect_item(this, item_object, true);
    }, this);
    
    firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/party_data").set(this.game.party_data).then(this.back_to_world.bind(this)).catch(RPG.handle_error);
};

RPG.BattleState.prototype.back_to_world = function () {
    "use strict";
    // go back to WorldState
    this.game.state.start("BootState", true, false, this.previous_level, "WorldState", {});
};

RPG.BattleState.prototype.move_menu = function (step) {
    "use strict";
    if (this.current_menu) {
        this.current_menu.move_selection(this.current_menu.current_item_index + step);
    }
};

RPG.BattleState.prototype.select_menu = function () {
    "use strict";
    if (this.current_menu) {
        this.current_menu.select();
    }
}