const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {

if (!args.join(" ")) return message.reply({content:`${basarisiz} ${message.author}, Yanlış kullanım doğrusu -> **${await db.get("prefix") || ayarlar.prefix}hakkımda <hakkımda>** şeklinde yazınız.`}).then(x => setTimeout(() => {x.delete()}, 5000))
  
try {
 await client.user.setAboutMe(args.join(" ")).then(() => {
  message.reply({content:`${basari} ${message.author}, Başarıyla hakkımda kısmın **${args.join(" ")}** olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000))
message.react('✅')
})
} catch {message.reply({content:`${basarisiz} ${message.author}, Bir hata oluştu.`}).then(x => setTimeout(() => {x.delete()}, 5000))
}
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h-degis","h-değiş","hakkimda"]
};

exports.help = {
  name: "hakkımda",
  description: "",
  usage: ""
};