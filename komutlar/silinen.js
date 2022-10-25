const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async (client, message, args) => { 
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()
if (message.channel.type !== "GROUP_DM" & message.channel.type !== "DM") return message.channel.send(`${basarisiz} ${message.author}, Bu komut sadece \`DM GRUPLARI\` veya \`DM\` kanallarinda kullanilabilir.`).then(x => setTimeout(() => {x.delete()}, 5000));
    
const sayılar = ["aç","kapat","remove","add"]
    
if (!args[0]) return message.channel.send(`${basarisiz} ${message.author}, Dogru bi komut gir **${await db.get("prefix") || ayarlar.prefix}log <aç/kapat/remove/add>**.`).then(x => setTimeout(() => {x.delete()}, 5000));
if(!sayılar.some(word => message.content.includes(word))) return message.channel.send(`${basarisiz} ${message.author}, Dogru bi komut gir **${await db.get("prefix") || ayarlar.prefix}log <aç/kapat/remove>**`).then(x => setTimeout(() => {x.delete()}, 10000))
    
if (args[0] === "aç") {
if (await db.get("mesajlog") === "Aktif") return message.channel.send(`${basarisiz} ${message.author}, Log sistemi zaten açık.`).then(x => setTimeout(() => {x.delete()}, 5000));
  await db.set(`mesajlog`, "Aktif")
message.channel.send(`${basari} ${message.author}, Log sistemi açıldı.`).then(x => setTimeout(() => {x.delete()}, 5000));
}
    
if (args[0] === "kapat") {
if (!await db.get("mesajlog")) return message.channel.send(`${basarisiz} ${message.author}, Log sistemi zaten kapalı.`).then(x => setTimeout(() => {x.delete()}, 5000));
  await db.delete(`mesajlog`)
message.channel.send(`${basari} ${message.author}, Log sistemi kapandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
}
    
if (args[0] === "remove") {

  let kullanici = message.mentions.users.first() || client.users.cache.get(args[1])

  if(!kullanici) return message.channel.send(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
  if(await db.get(`karaliste_${kullanici.id}`) === "Aktif") return message.channel.send(`${basarisiz} ${message.author}, Bu kullanıcıda zaten log tutmuyorum.`).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`karaliste_${kullanici.id}`, "Aktif")
message.channel.send(`${basari} ${message.author}, Artik ${kullanici} üyesinde log tutmicam.`).then(x => setTimeout(() => {x.delete()}, 5000));
}
    
if (args[0] === "add") {

  let kullanici = message.mentions.users.first() || client.users.cache.get(args[1])

  if(!await db.get(`karaliste_${kullanici.id}`)) return message.channel.send(`${basarisiz} ${message.author}, Bu kullanıcıda zaten log tutuyorum.`).then(x => setTimeout(() => {x.delete()}, 5000));
  if(!kullanici) return message.channel.send(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));

await db.delete(`karaliste_${kullanici.id}`)
message.channel.send(`${basari} ${message.author}, Artik ${kullanici} üyesinde log tutucam.`).then(x => setTimeout(() => {x.delete()}, 5000));
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['silinen'],
  permLevel: 4
};

exports.help = {
  name: "log",
  description: "Silinen Veya Düzenlenen Mesajın Logunu Atar.",
  usage: "log <aç/kapat/remove/add>"
};