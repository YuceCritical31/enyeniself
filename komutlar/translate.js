const Discord = require("discord.js-selfbot-v13");
const çeviri = require("google-translate-api")
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {

await message.delete()
if (!args[0]) return
if (!args.slice(1).join(' ')) return
  
message.channel.send(çeviri(args.slice(1).join(' '), {to: args[0]}))
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çeviri"],
  permLevel: 4
};

exports.help = {
  name: "trasnlate",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>"
};