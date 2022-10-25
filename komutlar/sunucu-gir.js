const Discord = require('discord.js-selfbot-v13');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji

exports.run = async(client, message, args)=> {
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()
  
try {
  let link = args[0]
  if (!link) return message.channel.send(`${basarisiz} ${message.author}, Bir link veya kod belirt!`).then(x => setTimeout(() => x.delete(), 5000))

await client.fetchInvite(link).then(x => {
x.acceptInvite(true)
message.channel.send(`${basari} ${message.author}, Basariyla **${x.guild.name}** adli sunucuya girdim.`).then(x => setTimeout(() => x.delete(), 5000))
})
}catch{
  message.channel.send({content:`${basarisiz} ${message.author}, Hatalı link girdiniz!`}).then(x => setTimeout(() => {x.delete()}, 5000))
  return;
}

}

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gir"],
  permLevel: 0
};

exports.help = {
  name: 'join',
  description: '',
  usage: 'avatar [@kullanıcı]'
};