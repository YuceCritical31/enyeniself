const { QuickDB } = require('quick.db');
const db = new QuickDB()
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
let kufur = await db.fetch(`taklit`);
if (args[0] == "aç" || args[0] == "ac") {
if (kufur) {

return message.reply(`${basarisiz} ${message.author}, Görünüşe göre taklit sistemi zaten aktif!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    } else {
      db.set(`taklit`, "Açık");


return message.reply(`${basari} ${message.author}, Taklit sistemi başarıyla açıldı.`)//.then(msg => {
    //console.log(`BOT: Yeniden Başlatılıyor.....`);
   // process.exit(0);
 // })
message.react('✅')
    }
  } else if (args[0] == "kapat") {
    if (!kufur) {

return message.reply(`${basarisiz} ${message.author}, Görünüşe göre taklit sistemi zaten kapalı!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    }
    db.delete(`taklit`);


return message.reply(`${basari} ${message.author}, Taklit sistemi başarıyla kapandı.`)//.then(msg => {
    //console.log(`BOT: Yeniden Başlatılıyor.....`);
    //process.exit(0);
 // })
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
  name: "taklit",
  description: "Bot",
  usage: "reklam-engel"
};