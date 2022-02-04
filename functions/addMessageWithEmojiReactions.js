
async function addMessageWithEmojiReactions (client, channel, embed, emoji, roles = false) {
    const tChannel = client.channels.cache.get(channel);
    
    if (roles) {
        for (let i = 0; i < emoji.length; i++) {
            embed.fields.push({})
            embed.fields[i].name = `\u200b`
            embed.fields[i].value = `<:emoji:${emoji[i]}> — <@&${roles[i]}>`
            embed.fields[i].inline = true
        }
        // console.log(embed)
        embed.fields.push({})
        embed.fields[embed.fields.length - 1].name = `\u200b`
        embed.fields[embed.fields.length - 1].value = `\u200b`
        embed.fields[embed.fields.length - 1].inline = false
    }

    const sendedMessage = await tChannel.send({ embeds: [embed] })
    
    await emoji.map ((current) => {
        return sendedMessage.react(current)
    })

    return sendedMessage
}

module.exports = addMessageWithEmojiReactions