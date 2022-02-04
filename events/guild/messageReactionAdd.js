const rolesFiltering = require('../../functions/rolesFiltering')
const fs = require('fs')

module.exports = async (e, user, client) => {
    if (user.id === client.user.id) return
    const reactionFilter = JSON.parse (fs.readFileSync('reactions_roles.json'))
    rolesFiltering (e, reactionFilter, 'emoji', user)
}