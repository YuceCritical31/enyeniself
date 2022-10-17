const Discord = require("discord.js-selfbot-v13");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {

if (!client.password & !process.env.password) return message.reply({content:`${basarisiz} ${message.author}, Lütfen projeye girip şifrenizi belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (!args.join(" ")) return message.reply({content:`${basarisiz} ${message.author}, Yanlış kullanım doğrusu -> **${await db.fetch("prefix") || ayarlar.prefix}isim <isim>** şeklinde yazınız.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (args.join(" ") === client.user.username) return message.reply({content:`${basarisiz} ${message.author}, Belirtilen isim önceki ile aynı olamaz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
  
try {
 await client.user.setUsername(args.join(" "), client.password || process.env.password).then(() => {
  message.reply({content:`${basari} ${message.author}, Başarıyla yeni ismin **${args.join(" ")}** olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000))
message.react('✅')
})
} catch {message.reply({content:`${basarisiz} ${message.author}, İsmini çok hızlı değişiyosun 1 saat sonra tekrar dene.`}).then(x => setTimeout(() => {x.delete()}, 5000))
}
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i-degis","i-değiş"]
};

exports.help = {
  name: "isim",
  description: "",
  usage: ""
};