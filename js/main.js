var RPG = RPG || {};

var config = {
   apiKey: "AIzaSyCnT5X11nrezFQmUbrn2CG9KP7cGFCh3TI",
    authDomain: "phaserpg-d7e9b.firebaseapp.com",
    databaseURL: "https://phaserpg-d7e9b.firebaseio.com",
    storageBucket: "phaserpg-d7e9b.appspot.com",
    messagingSenderId: "591116713649"
};
firebase.initializeApp(config);

var game = new Phaser.Game(640, 480, Phaser.CANVAS);

// initialize empty inventory
game.inventory = new RPG.Inventory();

game.state.add("BootState", new RPG.BootState());
game.state.add("LoadingState", new RPG.LoadingState());
game.state.add("WorldState", new RPG.WorldState());
game.state.add("BattleState", new RPG.BattleState());
game.state.add("MenuState", new RPG.MenuState());
game.state.add("TitleState", new RPG.TitleState());
game.state.start("BootState", true, false, "assets/levels/title_screen.json", "TitleState", {});