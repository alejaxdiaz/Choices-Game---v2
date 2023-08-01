// Game constants
const GAME_MESSAGES = {
    intro: (character, companionName) => `Welcome, ${character.name}! Your companion ${companionName}, has been captured by Mozarael, a powerful mage. You must embark on a quest to save ${companionName} from Mozarael's clutches. \n\nYou have ${character.lives} lives.`,
    gameOver: "Game over! You have lost all your lives. Please start again.",
    fatalChoice: "You have ventured boldly, yet chosen amiss. No shield of lives can turn the tide; your fate is sealed, your path awry. In mystery's embrace, you find your end, where not even valor can amend.",
    victory: companionName => `Congratulations! You have completed the game and saved ${companionName}!`,
    chapter2: character => `You have ${character.lives} lives. \n\nWith the villagers map you sneak in through a hidden underground tunnel and reach a hidden chamber filled with treasures. \nAs soon as you step inside, you'll notice magical glowing words appear in the center of the chamber. \n\nIn the depths of the chamber's veil,\nMagic guards, an enigmatic trail.\n\nChoose one object, for your fate, unveil.`,
    chapter3: character => `You have ${character.lives} lives. \n\nWith the invisibility cloke, you can move through the Tower undetected until you reach your destination. \nOn the last floor of the tower, you have one last option. You can see three magnificent doors. \nAt the top of the doors you can read: \n\nBeware the doors, shrouded in mystery's haze, \nOne holds death, where your steps will ablaze. \nAnother cradles freedom, a loyal embrace, \nWhile the last conceals a dreadful, eternal space.`,
};

const GAME_ITEMS = [
    { name: 'Health Potion', type: 'heal', value: 1 },
];

// Game functions
function promptUser(question) {
    return prompt(question);
}

function alertUser(message) {
    return alert(message);
}

function createCharacter(characterName) {
    return {
        name: characterName,
        lives: 3,
        inventory: [],
        potions: { heal: 0 }
    };
}

function addItemToInventory(character, item) {
    if (item.type === 'heal') {
        character.potions.heal += item.value; // Increment heal potions (by 1)
        alertUser(`You found a ${item.name}!`);
    }
}

function showInventory(character) {
    let inventoryMessage = `Inventory for ${character.name}:\n`;

    if (character.potions.heal > 0) {
        inventoryMessage += `\nYou have ${character.potions.heal} Health Potion(s).\n`;
    } else {
        inventoryMessage += "You have no Health Potions left.\n";
    }

    alertUser(inventoryMessage);
}

function useHealthPotion(character) {
    if (character.potions.heal > 0) {
        character.lives += 1;
        character.potions.heal -= 1; // Decrement the heal potions (by 1)
        alertUser(`You used a health potion and restored a life!`);
        alertUser(`You have ${character.lives} lives left.`);
    } else {
        alertUser('You have no health potions left!');
    }
}

function firstStage(character) {
    let firstChoice;
    do {
        firstChoice = promptUser("Choose your action:\n1. Go to the black tower through the front door\n2. Seek help from villagers\n3. Find a secret passage");
        switch (firstChoice) {
            case "1":
                alertUser("You approach the black tower, but Mozarael's magic barrier prevents your entry. You lose a life.");
                character.lives--;
                alertUser(`You have ${character.lives} lives left.`)
                break;
            case "2":
                alertUser("The villagers offer their assistance and provide you with the map to a hidden passage to enter Mozarael's Black Tower and avoid detection.");
                break;
            case "3":
                alertUser("You discover a hidden passage that leads you directly to Mozarael's lair. Unfortunately, Mozarael's dark magic overwhelms you, and you lose a life.");
                character.lives--;
                alertUser(`You have ${character.lives} lives left.`)
                break;
            default:
                alertUser("Invalid choice, please try again.");
        }
    } while (firstChoice !== "2" && character.lives > 0);
}

function secondStage(character, companionName) {
    let secondChoice;
    do {
        secondChoice = promptUser("What do you choose:\n1. A magical artifact with a golden glow \n2. A mighty enchanted sword \n3. A white cloak that appears to be inoffensive but attractive.");
        switch (secondChoice) {
            case "1":
                alertUser("You are weakened as soon as you touch the artifact and feel the curse in your veins. You lose a life.");
                character.lives--;
                alertUser(`You have ${character.lives} lives left.`)
                break;
            case "2":
                alertUser("It was actually a snake transformed into a sword that bit you and infected you. You lose a life.");
                character.lives--;
                alertUser(`You have ${character.lives} lives left.`)
                break;
            case "3":
                alertUser(`The cloak grants you invisibility. You use it to avoid conflict and look for ${companionName}.`);
                addItemToInventory(character, GAME_ITEMS[0]); // Add item to inventory if right choice is chosen 
                break;
            default:
                alertUser("Invalid choice, please try again.");
        }
    } while (secondChoice !== "3" && character.lives > 0);
}

//This stage should be the final one; if the player makes a bad decision, the game should be over, even if he has more lives. 
function thirdStage(character) {
    let thirdChoice;
    if (character.lives < 3) {
        let showInventoryChoice = promptUser("You've lost lives along the way, do you want to check your inventory? (Yes / No)");
        if (showInventoryChoice.toLowerCase() === 'yes') {
            showInventory(character);
            let usePotionChoice = promptUser("You have a Health Potion. Do you want to use it? ( Yes / No)");
            if (usePotionChoice.toLowerCase() === 'yes') {
                useHealthPotion(character);
            }
        }
    }

    alertUser(GAME_MESSAGES.chapter3(character));

    do {
        thirdChoice = promptUser("Which door do you choose:\n1. First one to the left \n2. Middle door \n3. Last to the right.");
        switch (thirdChoice) {
            case "1":
                alertUser("Upon crossing the Door of Peril, a grim fate befalls the hero. Defeated and overpowered, their journey reaches a tragic end. The echoes of their valiant efforts shall linger in the annals of history, forever remembered as a hero who faced their demise.");
                return false; // This is a final choice; if the player chose it, the game should end.
            case "2":
                alertUser("As the hero steps through the Door of Loyalty, a heartwarming sight awaits. There stands their loyal companion, held captive for far too long. With unwavering determination, the hero breaks the chains that bind their friend, and together they soar into the sky, leaving the tower and its shadows behind.");
                return true; // Success!
            case "3":
                alertUser("Behind the Door of Imprisonment lies a grim reality. The hero finds themselves trapped within its confines, swallowed by darkness and despair. Their fate is sealed, condemned to an eternity of confinement, forever severed from the light of freedom.");
                return false; // This is a final choice; if the player chose it, the game should end.
            default:
                alertUser("Invalid choice, please try again.");
                break;
        }
    } while (thirdChoice !== "1" && thirdChoice !== "2" && thirdChoice !== "3");
}

// Main game function
function startGame() {
    let characterName = promptUser("Enter your character name:");
    let companionName = promptUser("Enter your companion name:");
    let character = createCharacter(characterName);

    alertUser(GAME_MESSAGES.intro(character, companionName));

    // Call the first stage
    firstStage(character);
    if (character.lives <= 0) {
        alertUser(GAME_MESSAGES.gameOver);
        return; // End the game if no lives are remaining
    }

    alertUser(GAME_MESSAGES.chapter2(character));
    secondStage(character, companionName);
    if (character.lives <= 0) {
        alertUser(GAME_MESSAGES.gameOver);
        return; // End the game if no lives are remaining
    }

    if (thirdStage(character)) { // Call the third stage and check if the player won
        alertUser(GAME_MESSAGES.victory(companionName));
    } else {
        alertUser(GAME_MESSAGES.fatalChoice); // Show different message if the player choses wrong
    }
}

// Start the game
startGame();