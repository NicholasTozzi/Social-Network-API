const reactions = 
["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹",
"💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀",
"🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸",
"🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵",
"🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜",
"😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀",
"🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛",
"💚"]

const usernames = [
    ["shaquille.oatmeal", "hanging_with_my_gnomies", "hoosier-daddy", "fast_and_the_curious", "averagestudent", "BadKarma", "google_was_my_idea", "cute.as.ducks", "casanova", "real_name_hidden", "HairyPoppins", "fedora_the_explorer", "OP_rah", "YellowSnowman", "Joe Not Exotic", "username_copied", "whos_ur_buddha", "unfinished_sentenc", "AllGoodNamesRGone", "Something", "me_for_president", "tinfoilhat", "oprahwindfury", "anonymouse", "Definitely_not_an_athlete", "HeartTicker", "YESIMFUNNY", "BenAfleckIsAnOkActor", "magicschoolbusdropout", "Everybody", "regina_phalange", "PawneeGoddess", "pluralizes_everythings", "chickenriceandbeans", "test_name_please_ignore", "IYELLALOT", "heyyou", "laugh_till_u_pee", "aDistraction", "crazy_cat_lady", "banana_hammock", "thegodfatherpart4", "unfriendme", "babydoodles", "fluffycookie", "buh-buh-bacon", "ashley_said_what", "LactoseTheIntolerant", "ManEatsPants", "Twentyfourhourpharmacy", "applebottomjeans", "Babushka", "toastedbagelwithcreamcheese", "baeconandeggz", "FartinLutherKing", "coolshirtbra", "kentuckycriedfricken", "REVERANDTOAST", "kim_chi", "idrinkchocolatemilk", "SaintBroseph", "chin_chillin", "ghostfacegangsta", "bigfootisreal", "santas_number1_elf", "thehornoftheunicorn", "iNeed2p", "abductedbyaliens", "actuallynotchrishemsworth", "nachocheesefries", "personallyvictimizedbyreginageorge", "just-a-harmless-potato", "FrostedCupcake", "Avocadorable"]    
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUsername = () =>
  `${getRandomArrItem(usernames)}`;

// Function to generate random assignments that we can add to student object.
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      assignmentName: getRandomArrItem(reactions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomReaction };

