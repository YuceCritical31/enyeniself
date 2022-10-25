const { QuickDB } = require('quick.db');
const db = new QuickDB()
const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (![client.user.id].includes(message.author.id)) return
await message.delete()
  
  if (!args[0]) {
    
return message.channel.send(`${basarisiz} ${message.author}, Doğru bir argüman gir Aç veya Kapat.`).then(x => setTimeout(() => {x.delete()}, 5000));


    return;
  }
let kufur = await db.get(`ses`);
if (args[0] == "aç" || args[0] == "ac") {
if (kufur) {

return message.channel.send(`${basarisiz} ${message.author}, Görünüşe göre ses sistemi zaten aktif!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    } else {
    await  db.set(`ses`, "Açık");


return message.channel.send(`${basari} ${message.author}, Ses sistemi açılıyor biraz bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
    }
  } else if (args[0] == "kapat") {
    if (!kufur) {

return message.channel.send(`${basarisiz} ${message.author}, Görünüşe göre ses sistemi zaten kapalı!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    }
    await db.delete(`ses`);


return message.channel.send(`${basari} ${message.author}, Ses sistemi kapanıyor biraz bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "ses",
  description: "Ayarlanan Ses Kanalına Girmenizi Sağlar.",
  usage: "ses <aç/kapat>"
};