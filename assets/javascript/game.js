// Initiate list for all characters, make it an object
const characterList = {
  mario: {
    char_id: "1",
    name: "Mario",
    image: "./assets/images/mario.png",
    hp: 100,
    attack: 10,
  },
  bowser: {
    char_id: "2",
    name: "Bowser",
    image: "./assets/images/bowser.png",
    hp: 100,
    attack: 35,
    strength: 50,
  },
  captain_falco: {
    char_id: "3",
    name: "Captain Flaco",
    image: "./assets/images/captain-falco.png",
    hp: 100,
    attack: 55,
    strength: 20,
  },
  princess_peach: {
    char_id: "4",
    name: "Princess Peach",
    image: "./assets/images/princess-peach.png",
    hp: 100,
    attack: 40,
    strength: 30,
  },
  samus: {
    char_id: "5",
    name: "Samus",
    image: "./assets/images/samus.png",
    hp: 100,
    attack: 45,
    strength: 35,
  },
  yoshi: {
    char_id: "6",
    name: "Yoshi",
    image: "./assets/images/yoshi.png",
    hp: 100,
    attack: 45,
    strength: 40,
  },
};

// Initiate variables to hold playerChar, defender, defender, attackRoll, killCount
let playerChar;
let defender;
let enemiesArr = [];
let attackRoll = 0;
let killCount = 0;

// Create references to DOM elements that will be manipulated at all
let directionsDisp = $("#directions-row");
let characterSelectionDisp = $("#character-selection-display");
let playerCharDisp = $("#current-player-character-display");
let enemyDisp = $("#current-player-enemy-display");
let winsText = $("#wins-text");
let lossesText = $("#losses-text");

// When DOM has finished loading
$(document).ready(() => {
  // Create a function to dynamically render character cards in the characterSelectionDisp
  let renderCharacterCards = (list, display) => {
    for (var key in list) {
      // Create a new div for the character card
      var card = $("<div>", {
        id: list[key].name + "-card",
        class: "card",
      });

      // Create a new image div for card image
      var cardImg = $("<img>", {
        class: "card-img-top",
        src: list[key].image,
        alt: list[key].name,
      });

      // Create a new div for card body
      var cardBody = $("<div>", {
        class: "card-body",
      });

      // Create a new text div for card title
      var cardTitle = $("<h5>", {
        class: "card-title",
      }).text(list[key].name);

      // Create a new text div for card hp
      var cardHP = $("<p>", {
        class: "card-hp",
      }).text("HP: " + list[key].hp);

      // Create a new text div for card attack
      var cardATK = $("<p>", {
        class: "card-atk",
      }).text("ATK: " + list[key].attack);

      // Create a new text div for card strength
      var cardSTR = $("<p>", {
        class: "card-str",
      }).text("STR: " + list[key].strength);

      // Construct the card
      card.append(cardImg, cardBody);
      cardBody.append(cardTitle, cardHP, cardATK, cardSTR);

      // Append the card to characterSelectionDisp
      display.append(card);
    }
  };

  renderCharacterCards(characterList, characterSelectionDisp);
});
