const createChannelOnJoin = require('../../functions/createChannelOnJoin')
// const tChannel = ['942087275104317480', null]
const channelsFilter = 'created_channels'

module.exports = async (oldState, newState, client) => {

    if (oldState.channel !== null)      createChannelOnJoin(client, oldState,channelsFilter, true)
    else if (newState.channel !== null) createChannelOnJoin(client, newState, channelsFilter)
}