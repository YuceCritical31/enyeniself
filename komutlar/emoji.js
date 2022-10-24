const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async(client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {

try {
  if (!args[0]) return message.reply(`${basarisiz} ${message.author}, Bir emoji belirt.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
  let emoji = await client.emojis.cache.filter(x => x.name === args[0]).map(x => x.url)[0]
  if (!emoji) return message.reply(`${basarisiz} ${message.author}, Emojiyi bulamadim.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
message.edit({content:emoji + "?size=48"})
} catch {message.reply(`${basarisiz} ${message.author}, Emojiyi bulamadim.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
}

}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "emoji",
  description: "Nitro Olmadan Emoji Atmanızı Sağlar.",
  usage: "emoji <emojiadı>"
};