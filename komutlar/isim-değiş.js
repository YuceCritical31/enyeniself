const Discord = require("discord.js-selfbot-v13");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
  
if (!args[0]) return message.reply({content:`${basarisiz} ${message.author}, Yanlış kullanım doğrusu -> ${ayarlar.prefix}isim <isim> şeklinde yazınız.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (!client.password) {
  try {
 client.user.setUsername(args[0], args[1]).then(() => {
  message.reply({content:`${basari} ${message.author}, Başarıyla yeni ismin **${args[0]}** olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000))
message.react('✅')
})
} catch {
  message.reply({content:`${basarisiz} ${message.author}, Şifre kayıtlı değil lütfen ${ayarlar.prefix}isim <isim> <şifre> şeklinde yazınız.`}).then(x => setTimeout(() => {x.delete()}, 5000))
  }
} else {
try {
 client.user.setUsername(args.join(" "), client.password).then(() => {
  message.reply({content:`${basari} ${message.author}, Başarıyla yeni ismin **${args.join(" ")}** olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000))
message.react('✅')
})
} catch {message.reply({content:`${basarisiz} ${message.author}, İsmini çok hızlı değişiyosun 1 saat sonra tekrar dene.`}).then(x => setTimeout(() => {x.delete()}, 5000))
}
}
}};

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