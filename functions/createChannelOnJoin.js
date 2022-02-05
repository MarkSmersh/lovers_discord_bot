async function createChannelOnJoin (client, state, isLeft = false) {
    const users = state.channel.members
    const currentGuild = client.guilds.cache.find(guild => guild.id == state.guild.id)
    const channel = await currentGuild.channels.create('createChannelOnTap')
    



    if (!isLeft) 
    {
        
    }
    else 
    {

    }
}

module.exports = createChannelOnJoin