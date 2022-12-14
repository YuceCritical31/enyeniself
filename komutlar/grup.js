const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async (client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
  await message.delete()
if (message.channel.type !== "GROUP_DM") return message.channel.send(`${basarisiz} ${message.author}, Bu komut sadece \`DM GRUPLARI\` kanalinda kullanilabilir.`).then(x => setTimeout(() => {x.delete()}, 5000));
    
const sayılar = ["devret","leave","ekle","unban"]
    
if (!args[0]) return message.channel.send(`${basarisiz} ${message.author}, Dogru bi komut gir **${await db.get("prefix") || ayarlar.prefix}grup <sil/devret/ekle/unban/leave>**`).then(x => setTimeout(() => {x.delete()}, 5000));
if(!sayılar.some(word => message.content.includes(word))) return message.channel.send(`${basarisiz} ${message.author}, Dogru bi komut gir **${await db.get("prefix") || ayarlar.prefix}grup <sil/devret/ekle/unban/leave>**`).then(x => setTimeout(() => {x.delete()}, 10000))
    
if (args[0] === "devret") {
if (message.channel.owner.id !== client.user.id) return message.channel.send(`${ayarlar.basarisizemoji} ${message.author}, Grup lideri siz deilsiniz.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
  let kullanici = message.mentions.users.first() || message.channel.recipients.get(args[1])
  
if(!kullanici) return message.channel.send(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
//if (!message.channel.recipients.get(kullanici.id)) return message.channel.send("Bu üye grupta deil!")

await message.channel.setOwner(kullanici.id)
message.channel.send(`${basarili} ${message.author}, ${kullanici} adli kullaniciyi basariyla grup sahibi yaptm.`).then(x => setTimeout(() => {x.delete()}, 5000));
}
    
if (args[0] === "leave") {
await message.delete()
await message.channel.delete()
}
    
if (args[0] === "unban") {
  
  let kullanici = message.mentions.users.first() || message.channel.recipients.get(args[1]) || client.users.cache.get(args[1])
  
if(!kullanici) return message.channel.send(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));

await db.delete(`banli_${message.channel.id}_${kullanici.id}`)
message.channel.send(`${basarili} ${message.author}, ${kullanici} adli kullaniciyi artik gruptan atmiyacagim.`).then(x => setTimeout(() => {x.delete()}, 5000));
}
    
if (args[0] === "ekle") {
  
  let kullanici = message.mentions.users.first() || client.users.cache.get(args[1])
  
if(!kullanici) return message.channel.send(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));

await message.channel.addMember(kullanici.id)
message.channel.send(`${basarili} ${message.author}, ${kullanici} adli kullaniciyi basatiyla gruba ekledim.`).then(x => setTimeout(() => {x.delete()}, 5000));
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['grub'],
  permLevel: 4
};

exports.help = {
  name: "grup",
  description: "Grubu Devredebilir Gruptan Çıkabilir Gruba Birini Ekleyebilir Gruptan Banladığınız Kişinin Banını Açabilirsiniz.",
  usage: "grup </devret/leave/ekle/unban>"
};