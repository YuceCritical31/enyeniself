const Discord = require("discord.js-selfbot-v13");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
  
let data = await db.fetch(`prefix`)
let prefix = args.splice(0).join(" ")
if(!prefix) return message.reply(`${basarisiz} ${message.author}, Lütfen bir prefix belirtiniz.`).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === prefix) return message.reply(`${basarisiz} ${message.author}, Prefixiniz önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
message.reply(`${basari} ${message.author}, Prefixiniz \`${prefix}\` olarak ayarlandı.`)

await db.set(`prefix`, prefix)
message.react('✅')
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["prefix-ayar","prefix-ayarla"],
  permLevel: 4
};

exports.help = {
  name: "prefix",
  description: "",
  usage: ""
};