var RPG = RPG || {};

RPG.TitleState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);
    
    this.prefab_classes = {
        "background": RPG.Prefab.prototype.constructor,
        "text": RPG.TextPrefab.prototype.constructor
    };
};

RPG.TitleState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.TitleState.prototype.constructor = RPG.TitleState;

RPG.TitleState.prototype.preload = function () {
    "use strict";
    RPG.JSONLevelState.prototype.preload.call(this);
    this.load.text("default_data", this.level_data.default_data);
};

RPG.TitleState.prototype.create = function () {
    "use strict";
    RPG.JSONLevelState.prototype.create.call(this);
    
    this.user_input.set_input(this.user_inputs.title_user_input);
    
    this.default_data = JSON.parse(this.game.cache.getText("default_data"));
};

RPG.TitleState.prototype.login = function () {
    "use strict";
    var provider, user;
    if (!firebase.auth().currentUser) {
        provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        
        firebase.auth().signInWithPopup(provider).then(this.on_login.bind(this)).catch(RPG.handle_error);
    } else {
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid).once("value").then(this.start_game.bind(this));
    }
};

RPG.TitleState.prototype.on_login = function (result) {
    "use strict";
    firebase.database().ref("/users/" + result.user.uid).once("value").then(this.start_game.bind(this));
};

RPG.TitleState.prototype.start_game = function (snapshot) {
    "use strict";
    var user_data, items, item_key;
    user_data = snapshot.val();
    if (!user_data) {
        this.game.party_data = this.default_data.party_data;
        this.game.items = this.default_data.items;
    } else {
        this.game.party_data = user_data.party_data || this.default_data.party_data;
        items = user_data.items || this.default_data.items;
        for (item_key in items) {
            if (items.hasOwnProperty(item_key)) {
                this.game.inventory.collect_item(this, items[item_key], false);
            }
        }
    }
    this.game.state.start("BootState", true, false, "assets/levels/town.json", "WorldState", {});
};