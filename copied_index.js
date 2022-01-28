const { Client, Intents, Interaction } = require('discord.js');
// const { token } = require('./config.json');

const client = new Client(
    { 
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION']
    });



function strContains (string, stopWords) {
    var result = []

    words = string.split(' ')
    words.forEach(w => {
        var symbols = w.split('')
        
        stopWords.forEach(stopWord => {
            var metr = []
            var stopSymbols = stopWord.split('')
            

            symbols.forEach (symbol => {
                i = stopSymbols.indexOf(symbol)
                if (i !== -1 && !metr.includes(symbol)) metr.push(symbol)

            })
            
            var procent = Math.round(metr.length / stopSymbols.length * 100)
            if ((procent) > 0) result.push(procent)
            // var procent = Math.round((symbols.length > stopSymbols.length) ? metr.length / stopSymbols.length * 100 : metr.length / stopSymbols.length * 100)
        })        
    
    });

    return result
}



client.once('ready', c => {
	console.log(`${c.user.tag} - запущен`);
});

client.on('messageReactionAdd', async (reaction, user) => {
    // console.log(reaction.message)
    console.log(reaction.emoji.id)
});

client.login(process.env.token);
// client.login('OTM0NTQxNjAxMTc3NDY4OTI5.YexlsA.802LLAEuaiM_qvplpQIfxkarMiA');