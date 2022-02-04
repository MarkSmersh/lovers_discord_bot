const addMessageWithEmojiButtons = require('./addMessageWithEmojiButtons')
const buttonFilter = 'buttons_roles.json'
const rolesConstructor = require('./rolesConstructor')


async function roleOnButton (client, channel, comps, embed, roles) {

    if (comps.length !== roles.length)
        throw new error ("The number of buttons is not equal to the number of roles.")
    
    const message = await addMessageWithEmojiButtons(client, channel, comps, embed)

    rolesConstructor(message, comps, roles, buttonFilter, 'button')
}

module.exports = roleOnButton