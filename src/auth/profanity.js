const {Profanity} = require('@2toad/profanity');
const {ProfanityOptions} = require('@2toad/profanity');

const options = new ProfanityOptions();
options.wholeWord = false;
options.grawlix = '*****';

const profanity = new Profanity(options);
profanity.addWords(['randi', 'beshya', 'bhalu', 'muji']);
module.exports = profanity;