const { Client, Intents } = require('discord.js');
const { token } = require('./config.json')
const fs = require('fs')
const interactionCreate = require('./events/guild/interactionCreate')
const roleOnButton = require('./functions/roleOnButton')
const roleOnEmoji = require ('./functions/roleOnEmoji')
const messageReactionAdd = require('./events/guild/messageReactionAdd')
const messageReactionRemove = require('./events/guild/messageReactionRemove')
// const voiceStateUpdate = require('./events/guild/voiceStateUpdate')
const emojiEmbed = require('./embeds/emoji')
const buttonsEmbed = require('./embeds/buttons')
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
            '934357390025965608',
            [['male', 'Я парень', 'SECONDARY', '935219891458437191'], ['female', 'Я девушка', 'SECONDARY', '935218733448839169']],
            buttonsEmbed,
            ['934062265609625631', '934062286128164905']
        )
        roleOnEmoji 
        (
            client,
            '934373313218773044',
            emojiEmbed,
            [   
                '937324518081433621', '937356595938070538', '937614589103857704', '937379083136938044', 
                '939187544841674802', '939187598075756544', '939187689511591997', '939188103455834172', 
                '939187930268835943', '939187130322812979'
            ],
            [
                '934368148860321842', '934367977866928209', '934368518907002882', '934888593577639937',
                '934888587160346665', '934368066421272626', '934381681471807529', '934367864536834058',
                '934564374511747133', '934368243152470077'
            ]
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

// client.on('voiceStateUpdate', (oldState, newState) => {
//     voiceStateUpdate(oldState, newState, client)
// })

client.login(token);
// client.login(process.env.token);