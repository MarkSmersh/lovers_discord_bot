const fs = require('fs')
const rolesFiltering = require('../../functions/rolesFiltering')
const rolesFilter = 'buttons_roles'

module.exports = async (e, client) => {
    e.deferUpdate()
    // var buttonsFilter = await JSON.parse(fs.readFileSync(rolesFilter))
    const db = await client.mongoDB.connect()
    const data = await db.collection(rolesFilter).findOne({})
    delete data['_id']
    await client.mongoDB.client.close()

    if (e.isButton()) rolesFiltering(e, client, data, 'button', false, true)
}