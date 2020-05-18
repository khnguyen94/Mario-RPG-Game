// Initiate list for all characters, make it an object
const characterList = {
  mario: {
    char_id: "0",
    name: "Mario",
    image: "./assets/images/mario.png",
    hp: 100,
    attack: 60,
    strength: 20,
  },
  bowser: {
    char_id: "1",
    name: "Bowser",
    image: "./assets/images/bowser.png",
    hp: 100,
    attack: 35,
    strength: 50,
  },
  captainfalco: {
    char_id: "2",
    name: "Captain Falco",
    image: "./assets/images/captain-falco.png",
    hp: 100,
    attack: 55,
    strength: 20,
  },
  princesspeach: {
    char_id: "3",
    name: "Princess Peach",
    image: "./assets/images/princess-peach.png",
    hp: 100,
    attack: 40,
    strength: 30,
  },
  samus: {
    char_id: "4",
    name: "Samus",
    image: "./assets/images/samus.png",
    hp: 100,
    attack: 45,
    strength: 35,
  },
  yoshi: {
    char_id: "5",
    name: "Yoshi",
    image: "./assets/images/yoshi.png",
    hp: 100,
    attack: 45,
    strength: 40,
  },
};

// Create copy of the character list for manipulation over course of the game
let characterListCopy = {};
Object.assign(characterListCopy, characterList);

// Initiate variables to hold playerChar, currentEnemy, playerHasChosen, enemiesArr, attackRoll, isDoneFighting, killCount
let playerChar;
let playerCharList = {};

let playerHasChosen = false;

let currentEnemyRoll;
let currentEnemyChar;
let currentEnemyText;
let currentEnemyList = {};
let enemiesArr = {};
let enemiesNamesArr = [];

let enemyIsChosen = false;

let attackRoll = 0;
let doneFighting = false;
let killCount = 0;

// Create references to DOM elements that will be manipulated at all
let directionsDisp = $("#directions-row");

let characterSelectionRow = $("#character-selection-row");
let characterSelectionDisp = $("#character-selection-display");

let enemyRosterRow = $("#enemy-roster-row");
let enemyRosterDisp = $("#enemy-roster-display");

let playerCharDisp = $("#current-player-character-display");
let currentEnemyDisp = $("#current-player-enemy-display");

let attackBtn = $("#attack-button");

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

  renderCharacterCards(characterListCopy, characterSelectionDisp);

  // Create a function for when player selects a character
  selectCharFunc = (character, list) => {
    // Assign that character to playerChar variable
    playerChar = list[character];

    console.log("Player Selection: " + character);
    console.log("Char at ID: " + list[character].name);
    console.log(playerChar);

    // Update the playerHasChosen condition
    playerHasChosen = true;

    console.log(playerHasChosen);

    // Remove the selected character from the list
    delete list[character];

    // Assign the rest of the characters to the enemiesArr
    Object.assign(enemiesArr, list);
  };

  // Create a function to create an list of enemies in enemies list
  createNameArr = (list) => {
    // For loop to loop over each key in the list
    for (key in list) {
      enemiesNamesArr.push(list[key].name);
    }
  };

  // Create a function to select an enemy from the enemies list
  selectEnemyFunc = (namesArr, mainArr) => {
    console.log(namesArr);
    // Randomly roll a number between 0 and length of enemiesArr
    currentEnemyRoll = Math.floor(Math.random() * namesArr.length);

    console.log(currentEnemyRoll);

    // Assign enemy at that index to currentEnemy
    currentEnemyText = namesArr[currentEnemyRoll];

    console.log(namesArr.length);

    // convert currentEnemy to a single word all lower case and hold it in temp variable
    let currentEnemyTextFormatted = currentEnemyText
      .toLowerCase()
      .replace(/\s/g, "");

    console.log("Current Enemy Name: " + currentEnemyTextFormatted);

    // Assign that character to playerChar variable
    currentEnemyChar = mainArr[currentEnemyTextFormatted];

    console.log("Current Enemy Card:");
    console.log(currentEnemyChar);

    // Delete the selected enemy from the nameArr and from mainArr
    namesArr.splice(currentEnemyRoll, 1);
    delete mainArr[currentEnemyTextFormatted];

    console.log(namesArr);
    console.log(mainArr);
  };

  // Create a function that handles on click for when a player clicks on a card
  $(characterSelectionDisp).on("click", ".card", function () {
    console.log("Card Clicked");

    // Get a handle on the card clicked
    let clickedCard = $(this);

    console.log(clickedCard);

    // Get a handle on the clicked card's name
    let clickedCardName = clickedCard
      .children("div.card-body")
      .children("h5.card-title")
      .text()
      .split(" ")
      .join("")
      .toLowerCase();

    console.log("Clicked Card Name: " + clickedCardName);

    // Set playerChar to clickedCardName
    playerChar = clickedCardName;

    console.log("Player Character:" + playerChar);

    // Run the selectCharFunc using playerChar and characterListCopy
    selectCharFunc(playerChar, characterListCopy);

    // Append that character card to userChar
    playerCharList[clickedCardName] = playerChar;

    console.log(playerCharList);

    // Render the playerChar card into the playerCharDisp
    renderCharacterCards(playerCharList, playerCharDisp);

    // Hide instructions and characterSelectionDisp depending on playerHasChosen condition
    if (playerHasChosen) {
      directionsDisp.hide();
      characterSelectionRow.hide();
    }

    // Render the enemyArr into enemyRosterDisp
    renderCharacterCards(enemiesArr, enemyRosterDisp);

    console.log("Enemies Arr: ");
    console.log(enemiesArr);

    // Run the function to create name from enemiesArr
    createNameArr(enemiesArr);

    console.log("Enemies Name Arr: ");
    console.log(enemiesNamesArr);

    // Run function to randomly select an enemy from the names array
    selectEnemyFunc(enemiesNamesArr, enemiesArr);

    console.log("Enemy Array minus randomly selected enemy: ");
    console.log(enemiesArr);

    // Append that randomly chosen enemy card to enemyChar
    currentEnemyList[currentEnemyText] = currentEnemyChar;

    console.log(currentEnemyList);

    // Render the randomly chosen enemy into currentEnemyDisp
    renderCharacterCards(currentEnemyList, currentEnemyDisp);
  });

  // Create a function to listens for click of the attack button
  attackBtn.on("click", function () {
    // Check to see if user has chosen a character yet
    if (!playerHasChosen) {
      alert("Please choose a character first!");
    } else {
      console.log("Attack BTN Clicked");

      
    }
  });

  // Create a function that inializes the game
  initializeGameFunc = () => {
    // Create a function to form the enemies array
    createEnemiesArr = () => {};
  };
});
