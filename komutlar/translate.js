const Discord = require("discord.js-selfbot-v13");
const çeviri = require("@iamtraction/google-translate")
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
  await çeviri("merhaba", {from: "tr", to:mesaj})
  await db.set("çeviri", `${mesaj}`)
  message.reply(`${basarili} ${message.author}, çeviri sistemi basariyla açilmistir.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
  message.react('✅')
} else if (dil.toLowerCase() === "kapat") {
  if (!await db.fetch("çeviri")) return message.reply(`${basarisiz} ${message.author}, çeviri sistemi zaten kapali.`).then(x => setTimeout(() => {x.delete()}, 5000))
  await db.delete("çeviri")
  message.reply(`${basarili} ${message.author}, çeviri sistemi basariyla kapatilmistir.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
  message.react('✅')
} else {
await message.delete()

if (!mesaj) return message.reply(`${basarisiz} ${message.author}, Mesaj belirtin.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
await çeviri(mesaj, {to: dil}).then(x => message.channel.send({content:x.text}))
message.react('✅')
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