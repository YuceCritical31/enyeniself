const { MessageEmbed } = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async (client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
  await message.delete()
  if (!await db.get(`afk`)) return message.channel.send({content:`${basarisiz} ${message.author}, Görünüşe göre afk modu zaten kapalı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
message.channel.send({content:`${basarili} ${message.author}, Başarıyla afk modu kapandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
await db.delete(`afk`)
await db.delete(`afk_sebep`)
await db.delete(`afk_süre`)
};

exports.conf = {
  enabled: true,
  aliases: ['afk-k','afk-kapat']
};

exports.help = {
  name: "unafk",
  description: "Afk'dan Çıkmanızı Sağlar.",
  usage: "unafk"
};