const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()

if (!client.password & !process.env.password) return message.channel.send({content:`${basarisiz} ${message.author}, Lütfen projeye girip şifrenizi belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (!args.join(" ")) return message.channel.send({content:`${basarisiz} ${message.author}, Yanlış kullanım doğrusu -> **${await db.get("prefix") || ayarlar.prefix}isim <isim>** şeklinde yazınız.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (args.join(" ") === client.user.username) return message.channel.send({content:`${basarisiz} ${message.author}, Belirtilen isim önceki ile aynı olamaz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
  
try {
 await client.user.setUsername(args.join(" "), client.password || process.env.password).then(() => {
  message.channel.send({content:`${basari} ${message.author}, Başarıyla yeni ismin **${args.join(" ")}** olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000))
})
} catch {message.channel.send({content:`${basarisiz} ${message.author}, Bu isim çok kullanılıyo veya ismini çok hızlı değişiyosun 1 saat sonra tekrar dene.`}).then(x => setTimeout(() => {x.delete()}, 5000))
}
}

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