const { Client, Message } = require('discord.js') 
const client = new Client()
const { token, prefix } = require('./config.js')

client.on('message', (message) => {
    if (message.author.bot && message.channel.type == 'dm') return
    console.log(message.content)
     if (/(https:\/\/)discord\.gg\/([A-Z]){8}/i.test(message.content))
     message.channel.send ("Tu n'as pas le droit d'envoyer de message pendant 15min") 
    ("Si tu quittes le serveur, tes pubs seront supprimé")
    ("Utilise les bons salons pour tes pubs!")


})


client.on("ready", () => console.log(`${client.user.tag} en route !`))


client.login(token)