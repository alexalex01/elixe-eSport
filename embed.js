const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    fs = require('fs')
 
client.login(config.token)
client.commands = new Discord.Collection()
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})
 
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(`${member}`, new Discord.MessageEmbed()
        .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} ! 🎉`)
        .setColor('#00ff00'))
    member.roles.add(config.greeting.role)
})
 
client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} a quitté le serveur... 😢`)
        .setColor('#ff0000'))
})
 
const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Mon titre')
            .setTitle('Autre titre **bonjour**')
            .setDescription('[Recherche Google](https://google.fr) **bonjour**')
            .setColor('RANDOM')
            .addField('Champ 1 **bonjour**', 'Bonjour c\'est moi **bonjour**', true)
            .addField('Champ 2', 'Blabla', true)
            .setAuthor('ala89 **bonjour**', 'https://cdn.discordapp.com/attachments/718476721418141728/719563110154764298/logo.png', 'https://google.fr')
            .setImage('https://cdn.discordapp.com/attachments/718476721418141728/719563122960236644/thumb.png')
            .setThumbnail('https://cdn.discordapp.com/attachments/718476721418141728/719563110154764298/logo.png')
            .setFooter('Mon bot perso **bonjour**', 'https://cdn.discordapp.com/attachments/718476721418141728/719563110154764298/logo.png')
            .setTimestamp()
            .setURL('https://google.fr'))
    },
    name: 'embed'
}