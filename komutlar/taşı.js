const Discord = require('discord.js-selfbot-v13');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require('../ayarlar.json');
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()
  
if (message.channel.type !== "GUILD_TEXT") return message.reply(`${basarisiz} ${message.author}, Burası bir sunucu kanalı degil.`).then(x => setTimeout(() => {x.delete()}, 5000))  
if (!message.member.permissions.has("MOVE_MEMBERS")) return message.reply(`${basarisiz} ${message.author}, Kralım bu sunucuda \`ÜYELERİ TAŞI\` yetkiniz yok.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
  let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let uye2 = message.mentions.members.map(x => x)[1] || message.guild.members.cache.get(args[1])
  
  if (!uye) return message.reply(`${basarisiz} ${message.author}, Taşınacak üyeyi belirtmelisin!`).then(x => setTimeout(() => {x.delete()}, 5000));
  if (!args[1]) return message.reply(`${basarisiz} ${message.author}, Üyenin hangi kanala gidiceğini belirtmelisin!`).then(x => setTimeout(() => {x.delete()}, 5000))
  
if (uye2) {
if (!uye.voice.channel || !uye2.voice.channel || uye.voice.channelId == uye2.voice.channelId) return message.reply(`${basarisiz} ${message.author}, 2 kullanıcıdan birisi ses kanalında değil!`).then(x => setTimeout(() => {x.delete()}, 5000));
uye.voice.setChannel(uye2.voice.channelId)
} 
else  
if (kanal) {
uye.voice.setChannel(kanal.id)
}
  
  };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tasi"],
  permLevel: 0
}

exports.help = {
  name: 'taşı',
  description: "Etiketlenen Kişiyi Etiketlenen Kanala Atar.",
  usage: 'taşı <kanal>'
}
