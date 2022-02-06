function indexOfArrays (arr1, arr2) {
    var index = []
    
    arr1.forEach(el => {
        i = arr2.indexOf(el)
        if (i !== -1) index.push(i)
    });
    
    if (index.length !== 0) {
        return index
    }
    else {
        return false
    }
}

async function rolesFiltering (e, client, filter, type, user = false, oneSide = false, isRemove = false) {
    if 
    (type === 'button') {

        try {
            var filteredRole = filter[e.guildId][e.channelId][e.message.id][e.customId]
        } catch {
            return
        }

        if (!filteredRole) return
        var anotherRoles = filter[e.message.guildId][e.message.channelId][e.message.id]['all'].filter(
            item => item !== filteredRole
        )

        if (oneSide) {
            var coincidenceRoles = indexOfArrays(anotherRoles, e.member._roles)
            if (!!coincidenceRoles) {
                coincidenceRoles.forEach(i => {
                    var role = e.guild.roles.cache.find(role => role.id == e.member._roles[i]);
                    e.member.roles.remove(role)
                })
            }   
        }

        if (e.member._roles.includes(filteredRole)) return
        e.member.roles.add(e.guild.roles.cache.find(role => role.id == filteredRole))
    } 
    
    else if
    (type === 'emoji') {
        
        try {
            var filters = filter[e.message.guildId][e.message.channelId][e.message.id]
        } catch {
            return
        }

        if (!filters) return
        if (!Object.keys(filters).includes(e._emoji.id)) return

        var filteredRole = filters[e._emoji.id]
        if (await e.emoji.guild.emojis.cache.find(emoji => emoji == filteredRole) == -1) return

        const tUser = e.emoji.guild.members.cache.find(member => member.id == user.id)

        if (!isRemove) {
            if (tUser._roles.includes(filteredRole)) return
            tUser.roles.add(e.emoji.guild.roles.cache.find(role => role.id == filteredRole))
        } else if (isRemove) {
            tUser.roles.remove(e.emoji.guild.roles.cache.find(role => role.id == filteredRole))
        }
    }
}

module.exports = rolesFiltering