const Discord = require("discord.js-selfbot-v13");
const { translate } = require("bing-translate-api")
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {

  let mesaj = args.slice(1).join(' ')
  let dil = args[0]
  
if (!dil) return message.channel.send(`${basarisiz} ${message.author}, Bir dil belirtin.`).then(x => setTimeout(() => {x.delete()}, 5000))

try {
await message.delete()
if (dil.toLowerCase() === "aç") {
  if (await db.get("çeviri")) return message.channel.send(`${basarisiz} ${message.author}, Çeviri sistemi zaten açık.`).then(x => setTimeout(() => {x.delete()}, 5000))
  if (!mesaj) return message.channel.send(`${basarisiz} ${message.author}, Bir dil belirtin.`).then(x => setTimeout(() => {x.delete()}, 5000))
  await translate("merhaba", "tr", mesaj, true)
  await db.set("çeviri", `${mesaj}`)
  message.channel.send(`${basarili} ${message.author}, Çeviri sistemi basariyla açilmistir.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
  message.react('✅')
} else if (dil.toLowerCase() === "kapat") {
  if (!await db.get("çeviri")) return message.channel.send(`${basarisiz} ${message.author}, Çeviri sistemi zaten kapalı.`).then(x => setTimeout(() => {x.delete()}, 5000))
  await db.delete("çeviri")
  message.channel.send(`${basarili} ${message.author}, Çeviri sistemi başarıyla kapatılmıştır.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
  message.react('✅')
} else {

if (!mesaj) return message.channel.send(`${basarisiz} ${message.author}, Mesaj belirtin.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
await translate(mesaj, null, dil, true).then(x => message.edit({content:x.translation}))
}
} catch { message.channel.send(`${basarisiz} ${message.author}, Lütfen doğru bir dil girin.`).then(x => setTimeout(() => {x.delete()}, 5000)) }
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çeviri","çevir"],
  permLevel: 4
};

exports.help = {
  name: "çeviri",
  description: "",
  usage: "çeviri <aç/kapat/dil çevirilcek kelime>"
};