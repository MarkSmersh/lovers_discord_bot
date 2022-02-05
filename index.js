const { Client, Intents } = require('discord.js');
const { token, created } = require('./config.json')
const fs = require('fs')
const interactionCreate = require('./events/guild/interactionCreate')
const roleOnButton = require('./functions/roleOnButton')
const roleOnEmoji = require ('./functions/roleOnEmoji')
const messageReactionAdd = require('./events/guild/messageReactionAdd')
const messageReactionRemove = require('./events/guild/messageReactionRemove')
// const voiceStateUpdate = require('./events/guild/voiceStateUpdate')
const emojiEmbed = require('./embeds/emoji')
const buttonsEmbed = require('./embeds/buttons')

const client = new Client(
    {
        intents: 
        [
            Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES
        ],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION']
    });
        
client.once('ready', c => {
    console.log(`${c.user.tag} - запущен`);
});

client.on('interactionCreate', async e => {
    interactionCreate(e, client)
})

client.on('messageReactionAdd', (e, user) => {
    messageReactionAdd(e, user, client)
})

client.on('messageReactionRemove', (e, user) => {
    messageReactionRemove(e, user, client)
})

client.on('voiceStateUpdate', (oldState, newState) => {
    voiceStateUpdate(oldState, newState, client)
})

client.login(token);
// client.login(process.env.token);