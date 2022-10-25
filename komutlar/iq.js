const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");

let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async(client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
  
let kullanici = message.mentions.users.first()
if (!kullanici) {kullanici = message.author}
let iq = Math.floor(Math.random() * (135 - 45 + 1) + 45)

let smart_text = 1

if (iq > 90 && iq < 135) {
    smart_text = "Çok akıllı!";
  }
  else
  if (iq > 70 && iq < 90) {
    smart_text = "Ortalamanın biraz altında.";
  }
  else
  if (iq > 50 && iq < 70) {
    smart_text = "Bazı sorunları olabilir.";
  } else {
    if (iq < 50) {
      smart_text = "Ciddi derecede gerizekalı.";
    }
  }
  
message.reply(`> \`\`\`${kullanici.username} adlı kişinin IQ değeri **${iq}**. ${smart_text}\`\`\``)
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["zeka"],
  permLevel: 4
};

exports.help = {
  name: "iq",
  description: "Bir Kişinin IQ Değerine Bakmanızı Sağlar.",
  usage: "iq <etiket>"
};