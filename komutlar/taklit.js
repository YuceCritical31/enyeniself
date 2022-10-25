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
let kufur = await db.get(`taklit`);
if (args[0] == "aç" || args[0] == "ac") {
if (kufur) {

return message.channel.send(`${basarisiz} ${message.author}, Görünüşe göre taklit sistemi zaten aktif!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    } else {
     await db.set(`taklit`, "Açık");


return message.channel.send(`${basari} ${message.author}, Taklit sistemi başarıyla açıldı.`).then(x => setTimeout(() => {x.delete()}, 5000));
    }
  } else if (args[0] == "kapat") {
    if (!kufur) {

return message.channel.send(`${basarisiz} ${message.author}, Görünüşe göre taklit sistemi zaten kapalı!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    }
   await db.delete(`taklit`);


return message.channel.send(`${basari} ${message.author}, Taklit sistemi başarıyla kapandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
  }


}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "taklit",
  description: "",
  usage: "taklit <aç/kapat>"
};