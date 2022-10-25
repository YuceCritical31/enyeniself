const Discord = require('discord.js-selfbot-v13');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji

exports.run = async (client, message, emoji, args) => {
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()
if (message.channel.type !== "GUILD_TEXT") return message.channel.send(`${basarisiz} ${message.author}, Burası bir sunucu kanalı degil.`).then(x => setTimeout(() => {x.delete()}, 5000))
if (!message.member.permissions.has("MOVE_MEMBERS")) return message.channel.send(`${basarisiz} ${message.author}, Kralım bu sunucuda \`ÜYELERİ TAŞI\` yetkiniz yok.`).then(x => setTimeout(() => {x.delete()}, 5000))
  

let basari = ayarlar.basariliemoji
let member = message.mentions.members.first() || client.users.cache.get(args[0])

if(!member) return message.channel.send(`${basarisiz} ${message.author}, Ses bağlantısı kesilcek üyeyi belirtmelisin!`).then(x => setTimeout(() => {x.delete()}, 5000));

member.voice.setChannel(null)
}

exports.conf = { 
enabled: true, 
guildOnly: true, 
aliases: ["ses-kes"]
}

exports.help = {
name: "kes" 
}
