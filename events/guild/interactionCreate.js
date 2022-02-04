const fs = require('fs')
const rolesFilter = 'buttons_roles.json'
const rolesFiltering = require('../../functions/rolesFiltering')

module.exports = async (e, client) => {
    e.deferUpdate()
    var buttonsFilter = await JSON.parse(fs.readFileSync(rolesFilter))
    if (e.isButton()) rolesFiltering(e, buttonsFilter, 'button', false, true)
}