const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

async function addMessageWithEmojiButtons (client, channel, comps, embed) {

    const genderRow = new MessageActionRow().addComponents(comps.map((currentValue) => {
        return new MessageButton()
            .setCustomId(currentValue[0])
            .setLabel(currentValue[1])
            .setStyle(currentValue[2])
            .setEmoji(currentValue[3])
    }))

    const tChannel = client.channels.cache.get(channel);
    return sendedMessage = await tChannel.send({ components: [genderRow], embeds: [embed] })
}

module.exports = addMessageWithEmojiButtons