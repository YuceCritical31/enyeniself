const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");

let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async(client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
  
  let cevaplar = ["yazı","tura"]
  let yt = cevaplar[Math.floor(Math.random() * cevaplar.length)]
	
await message.edit(`Para Çeviriliyor...`).then(x => {
  
})
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "yt",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>"
};