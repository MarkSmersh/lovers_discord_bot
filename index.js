const { Client, Intents } = require('discord.js');
const { token } = require('./config.json')
const fs = require('fs')
const interactionCreate = require('./events/guild/interactionCreate')
const roleOnButton = require('./functions/roleOnButton')
const roleOnEmoji = require ('./functions/roleOnEmoji')
const messageReactionAdd = require('./events/guild/messageReactionAdd')
const messageReactionRemove = require('./events/guild/messageReactionRemove')
const voiceStateUpdate = require('./events/guild/voiceStateUpdate')
const emojiEmbed = require('./embeds/emoji')
const buttonsEmbed = require('./embeds/buttons')
const buttonsEmbed2 = require('./embeds/ua_buttons')
const MongoDB = require('./functions/getMongoDB')

const client = new Client(
    {
        intents: 
        [
            Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES
        ],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION']
    });
        
client.once ('ready', async c => {
    console.log(`${c.user.tag} - запущен`);

    const db = await client.mongoDB.connect()
    const data = await db.collection('state').findOne({})
    delete data['_id']
    // console.log(data)
    if (!data['created']) {
        roleOnButton
        (
            client,
            '942151536472113182',
            [['male', 'Я парень', 'SECONDARY', '749427098501906472'], ['female', 'Я woman', 'SECONDARY', '749424828326346855']],
            buttonsEmbed,
            ['749462520816730242', '768106102206234656']
        )
        roleOnButton
        (
            client,
            '942151536472113182',
            [['ua', 'UA', 'SECONDARY', ''], ['ru', 'RU', 'SECONDARY', ''], ['kz', 'KZ', 'SECONDARY', '']],
            buttonsEmbed2,
            ['768101951693914152', '768102282771431514', '942168717893173339']
        )
    }
        data['created'] = true
            db.collection('state').updateOne({}, {$set: data}, (err) => {
            if (err) throw new error (err)
            client.mongoDB.client.close()
    })
});

client.mongoDB = new MongoDB

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