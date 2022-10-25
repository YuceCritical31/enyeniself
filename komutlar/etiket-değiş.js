const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
await message.delete()

if (client.user.nitroType !== "NITRO_BOOST" & client.user.nitroType !== "NITRO_CLASSIC") return message.channel.send(`${basarisiz} ${message.author}, Bu komut için \`NITRO CLASSIC\` veya \`NITRO BOOST\` a ihtiyacın var.`).then(x => setTimeout(() => {x.delete()}, 5000))
if (!client.password & !process.env.password) return message.channel.send({content:`${basarisiz} ${message.author}, Lütfen projeye girip şifrenizi belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (isNaN(args[0])) return message.channel.send({content:`${basarisiz} ${message.author}, Yanlış kullanım doğrusu -> **${await db.get("prefix") || ayarlar.prefix}etiket <sayı>** şeklinde yazınız.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (args[0] === client.user.discriminator) return message.channel.send({content:`${basarisiz} ${message.author}, Belirtilen etiket önceki ile aynı olamaz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (args[0].length !== 4) return message.channel.send({content:`${basarisiz} ${message.author}, Belirtilen etiketin uzunluğu 4 olmadılıdır.`}).then(x => setTimeout(() => {x.delete()}, 5000))
  
try {
 await client.user.setDiscriminator(args[0], client.password || process.env.password).then(() => {
  message.channel.send({content:`${basari} ${message.author}, Başarıyla yeni etiketin **#${args[0]}** olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000))
})
} catch {message.channel.send({content:`${basarisiz} ${message.author}, Bu etiket baskaşı tarafından alınmış veya etiketini çok hızlı değişiyosun 1 saat sonra tekrar dene.`}).then(x => setTimeout(() => {x.delete()}, 5000))
}
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e-degis","e-değiş"]
};

exports.help = {
  name: "etiket",
  description: "",
  usage: ""
};