const Discord = require('discord.js-selfbot-v13');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require('../ayarlar.json')
///spammer by planta
 
exports.run = async(client, message, args) => {
if (![client.user.id].includes(message.author.id)) return
await message.delete()
  
      let basarisiz = ayarlar.basarisizemoji
      let sayi = args[0];
      let mesaj = args.slice(1).join(' ');

if (isNaN(sayi)) return message.channel.send(`${basarisiz} ${message.author}, ${await db.get(`prefix`) || ayarlar.prefix}spam <sayı> <mesaj> şeklinde yazınız.`).then(x => setTimeout(() => {x.delete()}, 5000))
if (mesaj.length < 1) return message.channel.send(`${basarisiz} ${message.author}, Kralım Spamlamam İçin Bişe Yazmalısınız.`).then(x => setTimeout(() => {x.delete()}, 5000))
  await message.delete();
for (var i = 0; i < sayi; i++)
{
message.channel.send(mesaj)
}

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'spam',
  description: 'spammer',
  usage: 'spam <yazdırmak istediğiniz şey>'
};