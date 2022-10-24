const Discord = require('discord.js-selfbot-v13');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji

exports.run = async(client, message, args)=> {
if(message.author.id === ayarlar.sahip) {
try {
  
  let link = args[0]
  if (!link) return message.reply(`${basarisiz} ${message.author}, Bir link veya kod belirt!`).then(x => setTimeout(() => x.delete(), 5000))

await client.fetchInvite(link).then(x => {
x.acceptInvite(true)
message.reply(`${basari} ${message.author}, Basariyla **${x.guild.name}** adli sunucuya girdim.`).then(x => setTimeout(() => x.delete(), 5000))
})
}catch{
  message.reply({content:`${basarisiz} ${message.author}, Hatalı link girdiniz!`}).then(x => setTimeout(() => {x.delete()}, 5000))
  return;
}

}}

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