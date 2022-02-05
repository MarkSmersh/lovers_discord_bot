const createChannelOnJoin = require('../../functions/createChannelOnJoin')
const tChannel = ['939561541127274536', null]

module.exports = (oldState, newState, client) => {
    if (tChannel.includes(oldState.channel) || tChannel.includes(newState.channel)) return

    if (oldState.channel !== null) createChannelOnJoin(client, oldState, true)
    else if (newState.channel !== null) createChannelOnJoin(client, newState)
}