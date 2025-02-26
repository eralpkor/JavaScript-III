/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
// Super class
function GameObject(gamer){
  this.createdAt = gamer.createdAt;
  this.name = gamer.name;
  this.dimensions = gamer.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(gamer) {
  this.healthPoints = gamer.healthPoints;
  GameObject.call(this, gamer); //
}
// subclass CharacterStats extends superclass
CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function(){
  return `${this.name} took damage.`;
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(character) {
  CharacterStats.call(this, character);
  this.team = character.team;
  this.weapons = character.weapons;
  this.language = character.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`
}

 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/
 // Stretch task: 
 function Villian(params) {
   Humanoid.call(this, params);
   this.crush = params.crush;
 }

 Villian.prototype = Object.create(Humanoid.prototype);

 Villian.prototype.attack = function (params) {
   params.healthPoints -= 10;
   if (params.healthPoints > 0) {
     return `${this.name} attacks ${params.name} with ${this.crush}! \n ${params.takeDamage()} \n Health points: ${params.healthPoints}`
   } else if (params.healthPoints <= 0) {
     return `${params.destroy()}`;
   }
 }

 function Hero(params) {
   Humanoid.call(this, params);
   this.crush = params.crush;
 }

 Hero.prototype = Object.create(Humanoid.prototype);

 Hero.prototype.kickArs = function (params) {
  params.healthPoints -= 10;
  if (params.healthPoints > 0) {
    return `${this.name} attacks ${params.name} with ${this.crush}! \n ${params.takeDamage()} \n Health points: ${params.healthPoints}`
  } else if (params.healthPoints <= 0) {
    return `${params.destroy()}`;
  }
 }

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 20,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints:30,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  const badGuy = new Villian({
    createdAt: new Date(),
    dimensions: {
      length: 90,
      width: 70,
      height: 1,
    },
    healthPoints: 50,
    name: 'Do It My Way',
    team: 'Z-Team',
    weapons: [
      'Knife',
      'Sword',
    ],
    language: 'Demon',
    crush: 'Bad Apple'
  });
  
  const goodGuy = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 5,
      width: 2,
      height: 200
    },
    healthPoints: 25,
    name: "Norman",
    team: "A-Team",
    weapons: ["Axe",
             "Smart"],
    language: "English",
    crush: 'Crazy lightning'
  });


  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  console.log(badGuy.attack(archer));// villian 
  console.log(goodGuy.kickArs(badGuy)); //hero 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!