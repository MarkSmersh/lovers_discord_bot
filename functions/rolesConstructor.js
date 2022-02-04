const fs = require('fs')

async function rolesConstructor (message, identificator, roles, file, type) {

    const data = await JSON.parse(fs.readFileSync(file)) 

    var indexOfFilter = ['guildId', 'channelId', 'id']
    var current = data

    if (type === 'button') {
        var keys = identificator
        var identificator = []
        keys.forEach((element) => {
            identificator.push(element[0])
        })
    }

    for (let i = 0; i < indexOfFilter.length; i++) {
        if (!current[message[indexOfFilter[i]]]) {
            current[message[indexOfFilter[i]]] = {}
        }
        current = current[message[indexOfFilter[i]]]
    }

    for (let i = 0; i < identificator.length; i++) {
        current[identificator[i]] = roles[i]
    }
    current['all'] = roles

    return fs.writeFileSync(file, JSON.stringify(data))
}

module.exports = rolesConstructor