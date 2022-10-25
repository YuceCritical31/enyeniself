const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()
let sayılar = ["aç","ac","kapat"]
let data = await db.get(`durum`)
let data2 = await db.get(`durum_süresi`)
let status = args[0]
if(!status) return message.channel.send(`${basarisiz} ${message.author}, ${db.get(`prefix`) || ayarlar.prefix}dz Aç/Kapat şeklinde yazınız.`).then(x => setTimeout(() => {x.delete()}, 5000))
if(!sayılar.some(word => message.content.includes(word))) return message.channel.send(`${basarisiz} ${message.author}, ${db.get(`prefix`) || ayarlar.prefix}dz Aç/Kapat şeklinde yazınız.`).then(x => x.delete({timeout: 5000}))

if (status === "aç" || status === "ac"){
if (data2) return message.channel.send(`${basarisiz} ${message.author}, Durum zamanı zaten açık.`).then(x => setTimeout(() => {x.delete()}, 5000))
await db.set(`durum_süresi`, Date.now())
if (!data){
message.channel.send(`${basari} ${message.author}, Durum zamanınız açıldı.`)
}
if (data) {
message.channel.send(`${basari} ${message.author}, Durum zamanınız açılıyor biraz bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })}
}
  

  
if (status === "kapat"){
if (!data2) return message.channel.send(`${basarisiz} ${message.author}, Durum zamanı zaten kapalı.`).then(x => setTimeout(() => {x.delete()}, 5000))
await db.delete(`durum_süresi`)
if (!data){
message.channel.send(`${basari} ${message.author}, Durum zamanınız kapatıldı.`)
}
if (data) {
message.channel.send(`${basari} ${message.author}, Durum zamanınız kapatılıyor biraz bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })}
}

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["zaman-ayar","dz"],
  permLevel: 4
};

exports.help = {
  name: "durum-zaman",
  description: "",
  usage: ""
};