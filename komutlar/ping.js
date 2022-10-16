const db = require("quick.db");
const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (![client.user.id,ayarlar.sahip,"429357746002067493"].includes(message.author.id)) return
  
const exampleEmbed = `Pingim: **${client.ws.ping}**ms`
  message.reply({content:exampleEmbed}).then(x => setTimeout(() => {x.delete()}, 5000))

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "ping",
  description: "Bot",
  usage: "reklam-engel"
};