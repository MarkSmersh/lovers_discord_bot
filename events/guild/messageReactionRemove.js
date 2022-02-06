const fs = require('fs')
const rolesFiltering = require('../../functions/rolesFiltering')
const rolesFilter = 'reactions_roles'

module.exports = async (e, user, client) => {
    if (user.id === client.user.id) return
    // const reactionFilter = JSON.parse (fs.readFileSync('reactions_roles.json'))
    const db = await client.mongoDB.connect()
    const data = await db.collection(rolesFilter).findOne({})
    delete data['_id']
    await client.mongoDB.client.close()

    rolesFiltering (e, client, data, 'emoji', user, false, true)
}