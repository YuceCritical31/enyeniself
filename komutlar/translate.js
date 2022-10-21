const Discord = require("discord.js-selfbot-v13");
const { translate } = require("bing-translate-api")
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {

  let mesaj = args.slice(1).join(' ')
  let dil = args[0]
  
if (!dil) return message.reply(`${basarisiz} ${message.author}, Bir dil belirtin.`).then(x => setTimeout(() => {x.delete()}, 5000))

try {  
if (dil.toLowerCase() === "aç") {
  if (await db.fetch("çeviri")) return message.reply(`${basarisiz} ${message.author}, çeviri sistemi zaten açik.`).then(x => setTimeout(() => {x.delete()}, 5000))
  if (!mesaj) return message.reply(`${basarisiz} ${message.author}, Bir dil belirtin.`).then(x => setTimeout(() => {x.delete()}, 5000))
  await translate("merhaba", "tr", mesaj, true)
  await db.set("çeviri", `${mesaj}`)
  message.reply(`${basarili} ${message.author}, çeviri sistemi basariyla açilmistir.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
  message.react('✅')
} else if (dil.toLowerCase() === "kapat") {
  if (!await db.fetch("çeviri")) return message.reply(`${basarisiz} ${message.author}, çeviri sistemi zaten kapali.`).then(x => setTimeout(() => {x.delete()}, 5000))
  await db.delete("çeviri")
  message.reply(`${basarili} ${message.author}, çeviri sistemi basariyla kapatilmistir.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
  message.react('✅')
} else {

if (!mesaj) return message.reply(`${basarisiz} ${message.author}, Mesaj belirtin.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
await translate(mesaj, null, dil, true).then(x => message.edit({content:x.translation}))
}
} catch { message.reply(`${basarisiz} ${message.author}, Lütfen dogru bir dil girin.`).then(x => setTimeout(() => {x.delete()}, 5000)) }
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çeviri"],
  permLevel: 4
};

exports.help = {
  name: "trasnlate",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>"
};