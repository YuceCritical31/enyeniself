const db = require("quick.db");
const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (message.author.id === ayarlar.sahip) {
  
  if (!args[0]) {
    
return message.reply(`${basarisiz} ${message.author}, Doğru bir argüman gir Aç veya Kapat.`).then(x => setTimeout(() => {x.delete()}, 5000));


    return;
  }
let kufur = await db.fetch(`ses`);
if (args[0] == "aç" || args[0] == "ac") {
if (kufur) {

return message.reply(`${basarisiz} ${message.author}, Görünüşe göre ses sistemi zaten aktif!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    } else {
    await  db.set(`ses`, "Açık");


return message.reply(`${basari} ${message.author}, Ses sistemi açılıyor biraz bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
message.react('✅')
    }
  } else if (args[0] == "kapat") {
    if (!kufur) {

return message.reply(`${basarisiz} ${message.author}, Görünüşe göre ses sistemi zaten kapalı!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    }
    await db.delete(`ses`);


return message.reply(`${basari} ${message.author}, Ses sistemi kapanıyor biraz bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
message.react('✅')
    }
}}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "ses",
  description: "Bot",
  usage: "reklam-engel"
};