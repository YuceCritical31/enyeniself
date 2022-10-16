const { MessageEmbed } = require("discord.js-selfbot-v13");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async (client, message, args) => {
  
  if (message.author.id === ayarlar.sahip) {
  if (db.fetch(`afk`) === "Açık") return message.reply(`${basarisiz} ${message.author}, Görünüşe göre afk modu zaten açık.`).then(x => setTimeout(() => {x.delete()}, 5000));
let sebep = args.slice(0).join(' ');
if (!sebep) return message.reply(`${basarisiz} ${message.author}, Bir sebep belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
  
message.reply(`${basarili} ${message.author}, Başarıyla \`${sebep}\` sebebiyle afk oldunuz.`).then(x => setTimeout(() => {x.delete()}, 5000));
await db.set(`afk`, "Açık")
await db.set(`afk_sebep`, sebep)
await db.set(`afk_süre`, Math.floor(Date.now() / 1000))
message.react('✅')
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['afk-a'],
  permLevel: 4
};

exports.help = {
  name: "afk",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>"
};