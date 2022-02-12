const MongoDB = require('./getMongoDB')

async function createChannelOnJoin (client, state, uri, isLeft = false) {
    const currentGuild = client.guilds.cache.find(guild => guild.id == state.guild.id)
    
    const mongo = new MongoDB
    const db = await mongo.connect()
    const collection = db.collection(uri)
    const data = await collection.findOne({})
    
    if (!isLeft) 
    {
        try {
            if (data[currentGuild.id]['constructor'] != state.channel.id) return
        } catch {
            return
        }

        const channel = await currentGuild.channels.create(`${state.member.user.username}'s комната`, {
            type: 'GUILD_VOICE',
            parent: state.channel.parentId
        })

        try 
        {
            data[currentGuild.id]['created'].push(channel.id)
            await collection.updateOne({}, {$set: data})
            await state.setChannel(channel.id)
        } 
        catch 
        {
            channel.delete()
            data[currentGuild.id]['created']
                .splice(data[currentGuild.id]['created'].indexOf(channel.id), 1)
            await collection.updateOne({}, {$set: data})
        }
        await mongo.client.close()
    }
    else 
    {
        if (!data[currentGuild.id]['created'].includes(state.channel.id)) return

        const channel = state.channel
        var membersCount = 0 

        for (member of channel.members) {
            membersCount++
        }

        if (membersCount === 0) {
            channel.delete()

            data[currentGuild.id]['created']
                .splice(data[currentGuild.id]['created'].indexOf(channel.id), 1)

            collection.updateOne({}, {$set: data}, (err) => {
                if (err) throw new error (err)
                mongo.client.close()
            })
        }

        
    }
}

module.exports = createChannelOnJoin