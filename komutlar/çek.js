const Discord = require('discord.js-selfbot-v13');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require('../ayarlar.json');
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
if (message.channel.type !== "GUILD_TEXT") return message.reply(`${basarisiz} ${message.author}, Burası bir sunucu kanalı degil.`).then(x => setTimeout(() => {x.delete()}, 5000))    
if (!message.member.permissions.has("MOVE_MEMBERS")) return message.reply(`${basarisiz} ${message.author}, Bu sunucuda \`ÜYELERİ TAŞI\` yetkiniz yok.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  
  if (!uye) return message.reply(`${basarisiz} ${message.author}, Ses odasına çekilecek üyeyi belirtmelisin!`).then(x => setTimeout(() => {x.delete()}, 5000));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelId == uye.voice.channelId) return message.reply(`${basarisiz} ${message.author}, İkiniz veya ikinizden birisi ses kanalında değil!`).then(x => setTimeout(() => {x.delete()}, 5000));
  
uye.voice.setChannel(message.member.voice.channelId)
message.react('✅')
  };
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cek"],
  permLevel: 0
}

exports.help = {
  name: 'çek',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
}
