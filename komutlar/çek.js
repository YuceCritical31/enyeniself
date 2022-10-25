const Discord = require('discord.js-selfbot-v13');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require('../ayarlar.json');
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
  
await message.delete()
if (message.channel.type !== "GUILD_TEXT") return message.channel.send(`${basarisiz} ${message.author}, Burası bir sunucu kanalı degil.`).then(x => setTimeout(() => {x.delete()}, 5000))    
if (!message.member.permissions.has("MOVE_MEMBERS")) return message.channel.send(`${basarisiz} ${message.author}, Bu sunucuda \`ÜYELERİ TAŞI\` yetkiniz yok.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  
  if (!uye) return message.channel.send(`${basarisiz} ${message.author}, Ses odasına çekilecek üyeyi belirtmelisin!`).then(x => setTimeout(() => {x.delete()}, 5000));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelId == uye.voice.channelId) return message.channel.send(`${basarisiz} ${message.author}, İkiniz veya ikinizden birisi ses kanalında değil!`).then(x => setTimeout(() => {x.delete()}, 5000));
  
uye.voice.setChannel(message.member.voice.channelId)
  };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cek"],
  permLevel: 0
}

exports.help = {
  name: 'çek',
  description: "Etiketlenen Kişiyi Olduğunuz Ses Kanalına Çeker.",
  usage: 'çek <etiket>'
}
