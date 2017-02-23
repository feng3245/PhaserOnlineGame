var RPG = RPG || {};

RPG.BossUnit = function (game_state, name, position, properties) {
    "use strict";
    RPG.EnemyUnit.call(this, game_state, name, position, properties);
    
    this.SPECIAL_ATTACK_THRESHOLD = 0.3;
    
    this.special_attack = new RPG.MagicAttack(this.game_state, this.name + "_attack", {x: 0, y: 0}, {group: "attacks", owner_name: this.name});
    
    this.current_state = "default";
    
    this.max_health = this.stats.health;
    this.enraged = false;
};

RPG.BossUnit.prototype = Object.create(RPG.EnemyUnit.prototype);
RPG.BossUnit.prototype.constructor = RPG.BossUnit;

RPG.BossUnit.prototype.act = function () {
    "use strict";
    switch (this.current_state) {
    case "default":
        this.default_act();
        break;
    case "special":
        this.special_act();
        break;
    case "enraged":
        this.enraged_act();
        break;
    }
    this.next_state();
};

RPG.BossUnit.prototype.next_state = function () {
    "use strict";
    var random_number;
    switch (this.current_state) {
    case "default":
        if (this.stats.health < 0.5 * this.max_health && !this.enraged) {
            this.enraged = true;
            this.current_state = "enraged";
        } else {
            random_number = this.game_state.rnd.frac();
            if (random_number < this.SPECIAL_ATTACK_THRESHOLD) {
                this.current_state = "special";
            }
        }
        break;
    case "special":
        this.current_state = "default";
        break;
    case "enraged":
        this.current_state = "default";
        break;
    }
};

RPG.BossUnit.prototype.default_act = function () {
    "use strict";
    var target_index, target, damage;
    // randomly choose target
    target_index = this.game_state.rnd.between(0, this.game_state.groups.player_units.countLiving() - 1);
    target = this.game_state.groups.player_units.children[target_index];
    
    this.attack.hit(target);
};

RPG.BossUnit.prototype.special_act = function () {
    "use strict";
    var target_index, target, damage;
    // randomly choose target
    target_index = this.game_state.rnd.between(0, this.game_state.groups.player_units.countLiving() - 1);
    target = this.game_state.groups.player_units.children[target_index];
    
    this.special_attack.hit(target);
};

RPG.BossUnit.prototype.enraged_act = function () {
    "use strict";
    this.game_state.groups.player_units.forEach(function (target) {
        this.special_attack.hit(target);
    }, this);
};