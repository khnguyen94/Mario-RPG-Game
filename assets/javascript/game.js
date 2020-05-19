// Initiate list for all characters, make it an object
const characterList = {
  mario: {
    char_id: "0",
    name: "Mario",
    image: "./assets/images/mario.png",
    hp: 100,
    isAlive: true,
    attack: 100,
    strength: 20,
  },
  bowser: {
    char_id: "1",
    name: "Bowser",
    image: "./assets/images/bowser.png",
    hp: 100,
    isAlive: true,
    attack: 35,
    strength: 50,
  },
  captainfalco: {
    char_id: "2",
    name: "Captain Falco",
    image: "./assets/images/captain-falco.png",
    hp: 100,
    isAlive: true,
    attack: 55,
    strength: 20,
  },
  princesspeach: {
    char_id: "3",
    name: "Princess Peach",
    image: "./assets/images/princess-peach.png",
    hp: 100,
    isAlive: true,
    attack: 40,
    strength: 30,
  },
  samus: {
    char_id: "4",
    name: "Samus",
    image: "./assets/images/samus.png",
    hp: 100,
    isAlive: true,
    attack: 45,
    strength: 35,
  },
  yoshi: {
    char_id: "5",
    name: "Yoshi",
    image: "./assets/images/yoshi.png",
    hp: 100,
    isAlive: true,
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

// Initiate battle variables
let atkSuccessMsg = "You attacked " + currentEnemyText + " for __ damage!";
let atkFailMsg = "Your attack missed " + currentEnemyText + "!";

let attackSuccessRoll = 0;
let fightOver = false;
let enemiesLeft = 5;
let allEnemiesDefeated = false;
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

let killsText = $("#kills-text");

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
      var cardTitle = $("<h6>", {
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

    // console.log("Player Selection: " + character);
    // console.log("Char at ID: " + list[character].name);
    // console.log(playerChar);

    // Update the playerHasChosen condition
    playerHasChosen = true;

    // console.log(playerHasChosen);

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
    // console.log(namesArr);

    // If there are any enemies left on the rost
    if (namesArr.length > 0) {
      // Randomly roll a number between 0 and length of enemiesArr
      currentEnemyRoll = Math.floor(Math.random() * namesArr.length);

      // console.log(currentEnemyRoll);

      // Assign enemy at that index to currentEnemy
      currentEnemyText = namesArr[currentEnemyRoll];

      // console.log(namesArr.length);

      // convert currentEnemy to a single word all lower case and hold it in temp variable
      let currentEnemyTextFormatted = currentEnemyText
        .toLowerCase()
        .replace(/\s/g, "");

      // console.log("Current Enemy Name: " + currentEnemyTextFormatted);

      // Assign that character to playerChar variable
      currentEnemyChar = mainArr[currentEnemyTextFormatted];

      // console.log("Current Enemy Card:");
      // console.log(currentEnemyChar);

      // Delete the selected enemy from the nameArr and from mainArr
      namesArr.splice(currentEnemyRoll, 1);
      delete mainArr[currentEnemyTextFormatted];

      // Clear the enemyRosterDisp
      enemyRosterDisp.empty();

      // Run the renderCards function on the enemyRosterDisp
      renderCharacterCards(mainArr, enemyRosterDisp);

      // console.log(namesArr);
      // console.log(mainArr);
    } else {
      console.log("There are not enemies left on the roster.");
    }
  };

  // Create a function that handles on click for when a player clicks on a card
  $(characterSelectionDisp).on("click", ".card", function () {
    // console.log("Card Clicked");

    // Get a handle on the card clicked
    let clickedCard = $(this);

    // console.log(clickedCard);

    // Get a handle on the clicked card's name
    let clickedCardName = clickedCard
      .children("div.card-body")
      .children("h6.card-title")
      .text()
      .split(" ")
      .join("")
      .toLowerCase();

    // console.log("Clicked Card Name: " + clickedCardName);

    // Set playerChar to clickedCardName
    playerChar = clickedCardName;

    // console.log("Player Character:" + playerChar);

    // Run the selectCharFunc using playerChar and characterListCopy
    selectCharFunc(playerChar, characterListCopy);

    // Append that character card to userChar
    playerCharList[clickedCardName] = playerChar;

    // console.log(playerCharList);

    // Render the playerChar card into the playerCharDisp
    renderCharacterCards(playerCharList, playerCharDisp);

    // Hide instructions and characterSelectionDisp depending on playerHasChosen condition
    if (playerHasChosen) {
      directionsDisp.hide();
      characterSelectionRow.hide();
    }

    // Render the enemyArr into enemyRosterDisp
    renderCharacterCards(enemiesArr, enemyRosterDisp);

    // console.log("Enemies Arr: ");
    // console.log(enemiesArr);

    // Run the function to create name from enemiesArr
    createNameArr(enemiesArr);

    // console.log("Enemies Name Arr: ");
    // console.log(enemiesNamesArr);

    // Run function to randomly select an enemy from the names array
    selectEnemyFunc(enemiesNamesArr, enemiesArr);

    // console.log("Enemy Array minus randomly selected enemy: ");
    // console.log(enemiesArr);

    // Append that randomly chosen enemy card to enemyChar
    currentEnemyList[currentEnemyText] = currentEnemyChar;

    // console.log(currentEnemyList);

    // Render the randomly chosen enemy into currentEnemyDisp
    renderCharacterCards(currentEnemyList, currentEnemyDisp);
  });

  // Create a function that

  // Create a function to listens for click of the attack button
  attackBtn.on("click", function () {
    // Check to see if user has chosen a character yet
    // And that both char's are still alive
    if (!playerHasChosen) {
      alert("Please choose a character first!");
    } 
    else if (playerHasChosen && enemiesLeft == 0) {
        alert("No more enemies to fight!");
    }
    else {
      console.log("Attack BTN Clicked");

      // Create a function to handle dead/alive status of a char
      updateAliveStatusFunc = (character) => {
        if (character["hp"] > 0) {
          character["isAlive"] = true;

          console.log(character["name"] + " is alive.");
        } else {
          character["isAlive"] = false;

          console.log(character["name"] + " is dead.");
        }
      };

      // Create a function to handle calculating attack success
      calcAtkSuccessFunc = (character) => {
        // playerChar
        // currentEnemyChar

        // console.log("Player Char Atk Lvl: " + character["attack"]);

        // Roll a random number out of 100 and assign it to attackSuccessRoll
        attackSuccessRoll = Math.floor(Math.random() * 100);
        // console.log("Attack Success Roll: " + attackSuccessRoll);

        // If attackSuccessRoll was higher than player's char's attack value
        if (attackSuccessRoll < character["attack"]) {
          // Update atkWasSuccessful to true
          atkWasSuccessful = true;

          console.log("Attack Successful!");
        } else {
          atkWasSuccessful = false;
          console.log("Attack Unsuccessful!");
        }
      };

      calcAtkSuccessFunc(playerChar, currentEnemyChar);

      // Create a function for a successful attack
      successfulAtkFunc = (atkChar, defChar) => {
        // Conditions: attack was success, atkChar HP > 0, defChar HP > 0
        if (atkWasSuccessful && atkChar["hp"] > 0) {
          console.log(atkChar["name"] + " HP: " + atkChar["hp"]);
          console.log(defChar["name"] + " HP: " + defChar["hp"]);

          // Access defChar's HP value and subtract from it defChar's str value
          defChar["hp"] -= atkChar["strength"];

          console.log("Updated");
          console.log(atkChar["name"] + " HP updated: " + atkChar["hp"]);
          console.log(defChar["name"] + " HP updated: " + defChar["hp"]);

          // Run deadAliveStatusFunc to see isAlive status of both characters
          updateAliveStatusFunc(atkChar);
          updateAliveStatusFunc(defChar);

          console.log("______");
        }
      };

      successfulAtkFunc(playerChar, currentEnemyChar);

      // Create a function for an unsuccessful attack
      unsuccessfulAtkFunc = (defChar, atkChar) => {
        // Conditions: attack was success, atkChar HP > 0, defChar HP > 0
        if (!atkWasSuccessful) {
          console.log(atkChar["name"] + " HP: " + atkChar["hp"]);
          console.log(defChar["name"] + " HP: " + defChar["hp"]);

          // Access atkChar's HP value and subtract from it defChar's str value
          atkChar["hp"] -= defChar["strength"];

          console.log("Updated");
          console.log(atkChar["name"] + " HP updated: " + atkChar["hp"]);
          console.log(defChar["name"] + " HP updated: " + defChar["hp"]);

          // Run deadAliveStatusFunc to see isAlive status of both characters
          updateAliveStatusFunc(atkChar);
          updateAliveStatusFunc(defChar);

          console.log("______");
        }
      };

      unsuccessfulAtkFunc(currentEnemyChar, playerChar);

      // Create a function to handle what update fightOver condition
      // (when either playerChar or currentEnemyChar's HP is 0)
      updatefightOverFunc = (atkChar, defChar) => {
        // If atkChar is dead
        if (atkChar["isAlive"] == false) {
          // Set fightOver condition to true
          fightOver = true;

          console.log("Fight is over.");

          console.log("Winner is: " + defChar["name"]);
        }
        // if defChar is dead
        else if (defChar["isAlive"] == false) {
          // Set fightOver condition to true
          fightOver = true;

          console.log("Fight is over.");

          console.log("Winner is: " + atkChar["name"]);
        } else {
          // Keep fightOver condition to false
          fightOver = false;

          console.log(fightOver);
        }
      };

      updatefightOverFunc(playerChar, currentEnemyChar);

      // Create a function to handle what happens when fightOver is true
      handleFightOverFunc = (atkChar, defChar) => {
        // If fightOver is true and atkChar is alive
        if (fightOver && atkChar["isAlive"]) {
          // Alert the user that they won the fight, and that another fighter is entering the ring
          alert("You won the fight. Get ready for the next round!");

          // Reset your health to full
          atkChar["hp"] = 100;

          // Clear the currentEnemyDisp
          currentEnemyDisp.empty();

          // Reset the currentEnemyChar variable
          currentEnemyChar = {};

          // Reset the currentEnemyList variable
          currentEnemyList = {};

          // Update the wins counter by adding 1
          killCount += 1;

          // Update killsText to reflect current killCount
          killsText.text(killCount);

          // Update the enemiesLeft counter by subtracting 1
          enemiesLeft -= 1;
          console.log("Enemies Left: " + enemiesLeft);

          // If enemiesLeft counter is 0
          if (enemiesLeft > 0) {
            // Randomly select a new enemy from the remainging enemies
            selectEnemyFunc(enemiesNamesArr, enemiesArr);

            // Append that randomly chosen enemy card to enemyChar
            currentEnemyList[currentEnemyText] = currentEnemyChar;

            // Render the randomly chosen enemy into currentEnemyDisp
            renderCharacterCards(currentEnemyList, currentEnemyDisp);
          }
        } else if (fightOver && atkChar["isAlive"] && enemiesLeft == 0) {
          // Alert the player they have defeated all the enemies and won the game
          alert("You defeated all opponents. You win the game!");
        } else if (fightOver && defChar["isAlive"]) {
          // Alert the user that they lost and the game is over
          alert("You lost the fight. Game Over!");
        }
      };

      handleFightOverFunc(playerChar, currentEnemyChar);

      updateAllEnemiesDefeatedFunc = () => {
        // If enemiesLeft is 0
        if (enemiesLeft == 0) {
          // Update the allEnemiesDefeated to be true
          allEnemiesDefeated = true;
        }
      };

      updateAllEnemiesDefeatedFunc();

      // Create a function to handle when you've defeated all opponents
      handleVictoryFunc = () => {
        if (allEnemiesDefeated) {
          // Reset the game by running the
        }
      };
    }
  });
});
