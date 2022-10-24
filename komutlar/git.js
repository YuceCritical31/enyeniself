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

    let kanal = message.mentions.channels.first() || client.channels.cache.get(args[0])
    let data = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
  if (!args[0]) return message.reply(`${basarisiz} ${message.author}, Ses odasına gidilecek üyeyi/kanalı belirtmelisin!`).then(x => setTimeout(() => {x.delete()}, 5000));
  
if (kanal) {
message.member.voice.setChannel(kanal.id)
message.react('✅')
}

if (data) {
if (!message.member.voice.channel || !data.voice.channel || message.member.voice.channelId == data.voice.channelId) return message.reply(`${basarisiz} ${message.author}, İkiniz veya ikinizden birisi ses kanalında değil!`).then(x => setTimeout(() => {x.delete()}, 5000));
if (!message.member.voice.setChannel(data.voice.channelId)) return message.reply(`${basarisiz} ${message.author}, Bu kanala giriş yetkiniz yok!`).then(x => setTimeout(() => {x.delete()}, 5000))
message.member.voice.setChannel(data.voice.channelId)
message.react('✅')
}
  };
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'git',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
}
