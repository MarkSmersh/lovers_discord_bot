const addMessageWithEmojiReactions = require('./addMessageWithEmojiReactions')
const emojiFilter = 'reactions_roles.json'
const rolesConstructor = require('./rolesConstructor')

async function roleOnEmoji (client, channel, embed, emoji, roles) {

    if (emoji.length !== roles.length)
        throw new error ("The number of emojis is not equal to the number of roles.") 

    const message = await addMessageWithEmojiReactions(client, channel, embed, emoji, roles)

    rolesConstructor(message, emoji, roles, emojiFilter)
}

module.exports = roleOnEmoji