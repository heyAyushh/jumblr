//hella

var restify = require('restify');
var builder = require('botbuilder');
var randomWord = require('random-word');

var word;
var shuffle;

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());
// Create our bot to listen in on the chat connector.

global.bot = new builder.UniversalBot(connector, (session) => {
     session.beginDialog(' start ');

});


bot.dialog(' start ', [
    function (session) {
        session.sendTyping();

        word = randomWord();
        shuffle = shuffleWord(word);
        console.log(word);
        session.send('Solve the Jumbled word ');

        builder.Prompts.text(session,shuffle);
    },

    function (session, results) {
        if (check(word,results.response) == 1) {
            session.sendTyping();
            session.send("Yes, You are Right ");
            session.send("Right answer is ",word);

        }
        else {
            session.sendTyping();
            session.send("Sorry, You are Wrong ");
            session.send("Right answer is ",word);
            
        }
        session.endDialogWithResult(results);
    }
]);

function evalscore(count)
{
    if(count==1)
    {
        score++;
        return 0;
    }
    else
    {
        score--;
        return 0;
    }
    
}

function check(temp, word)
{
    if(temp==word)
        return 1;
    return 0;
}

function shuffleWord (word){
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
}
require('./dialogs');
require('./functions');