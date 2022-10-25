const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");

let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async(client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
  
  let cevaplar = ["Yazı","Tura"]
  let yt = cevaplar[Math.floor(Math.random() * cevaplar.length)]
	
await message.edit(`> Para Çeviriliyor...`).then(x => {
setTimeout(() => {
  message.edit("> Yazı...").then(x => {setTimeout(() => {
    x.edit("> Tura...").then(() => {
setTimeout(() => {message.edit(`> Yazı...`).then(() => {
setTimeout(() => {message.edit(`> Para \`${yt}\` çıktı!`)}, 1000)
    })}, 1000)
    })
  }, 1000)})
}, 1000)
})
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yazıtura","cf","coinflip","yazı-tura","yazitura","yazi-tura"],
  permLevel: 4
};

exports.help = {
  name: "yt",
  description: "Yazı Tura Atmanızı Sağlar.",
  usage: "yt"
};