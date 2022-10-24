const Discord = require('discord.js-selfbot-v13');
const ayarlar = require('../ayarlar.json');
 
exports.run = async(client, message, args) => {
  if (message.author.id === ayarlar.sahip) {
      let basarisiz = ayarlar.basarisizemoji
      let basari = ayarlar.basariliemoji
      let sayı = args[0]

if (sayı < 1) return message.reply(`${basarisiz} ${message.author}, **1** adetten az mesaj silemem!`).then(x => setTimeout(() => {x.delete()}, 5000));
if (sayı > 100) return message.reply(`${basarisiz} ${message.author}, **100** adetten fazla mesaj silemem!`).then(x => setTimeout(() => {x.delete()}, 5000));
if (isNaN(sayı)) return message.reply(`${basarisiz} ${message.author}, 1-100 arasında bir sayı belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000))
 
await message.delete()  
    
await message.channel.messages.fetch().then(x => {
x.filter(a => a.author.id === client.user.id && !a.system).map(a => a).slice(0, sayı).forEach(s => s.delete())});

message.channel.send(`${basari} ${message.author}, Başarılı **${sayı}** mesaj siliniyor...`).then(x => setTimeout(() => {x.delete()}, 5000))
}};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: 'sil',
  description: 'En Fazla 100 Mesaj Olmak Üzere Mesajlarınızı Siler.',
  usage: 'sil <1 ve 100 arası sayı>'
};