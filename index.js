const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed, GuildMemberRoleManager } = require('discord.js');
const fs = require ('fs')

const client = new Client(
    { 
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION']
    });

    
    function addMessageWithEmojiButtons () {
        // client.channels.cache.get(channel).send('123')
        const tChannel = client.channels.cache.get('934988881361768458');
        // console.log(tChannel)
        
        const genderRow = new MessageActionRow().addComponents(
            
            new MessageButton()
            .setCustomId('male')
            .setLabel('Мужской пол')
            .setStyle('SECONDARY')
            .setEmoji('935219891458437191'),
            
            new MessageButton()
            .setCustomId('female')
            .setLabel('Женский пол')
            .setStyle('SECONDARY')
            .setEmoji('935218733448839169'),   
            
            )
            const embed = new MessageEmbed()
            .setColor('#f100ff')
            .setTitle('Добро пожаловать на наш сервер!')
            .setURL('')
            .setDescription(`Здесь Вы найдете не просто интересных собеседников и собеседниц, а даже, возможно, Вашу вторую половинку.
            
            Для получения роли пола, нажмите на соответствующий эмодзи под данным сообщением. Если Вы хотите пройти верификацию, оставьте обращение в
            <#934351643649146921>
            
            Приятного общения и хорошего времяпрепровождения!
            
            - С уважением, администрация L0VERS`);
            
            tChannel.send({ components: [genderRow], embeds: [embed] })
            
        }
        
        client.once('ready', c => {
            console.log(`${c.user.tag} - запущен`);
            // addMessageWithEmojiButtons()
            // client.destroy()
        });
        
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
        
        client.on('interactionCreate', async e => {
            if (!e.isButton()) return
            e.deferUpdate()
            
            let rawdata = fs.readFileSync('buttons_roles.json');
            
            var data = JSON.parse(rawdata);
            var filteredRole = data[e.guildId][e.channelId][e.message.id][e.customId]
            
            if (e.member._roles.includes(filteredRole)) return
            
            var anotherRoles = data[e.guildId][e.channelId][e.message.id]['all'].filter(item => item !== filteredRole)
            var coincidenceRoles = indexOfArrays(anotherRoles, e.member._roles)
            
            if (!!coincidenceRoles) {
                coincidenceRoles.forEach(i => {
                    var role = e.guild.roles.cache.find(role => role.id == e.member._roles[i]);
                    e.member.roles.remove(role)
                })
            }
            
            e.member.roles.add(e.guild.roles.cache.find(role => role.id == filteredRole))
            
        })

// client.login('OTM0NTQxNjAxMTc3NDY4OTI5.YexlsA.802LLAEuaiM_qvplpQIfxkarMiA');
client.login(process.env.token);