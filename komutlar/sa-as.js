const { QuickDB } = require('quick.db');
const db = new QuickDB()
const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (message.author.id === ayarlar.sahip) {
  
if(message.channel.type === "GUILD_TEXT") {
  
  if (!args[0]) {
    
return message.reply(`${basarisiz} ${message.author}, Doğru bir argüman gir Aç veya Kapat.`).then(x => setTimeout(() => {x.delete()}, 5000));


    return;
  }
let kufur = await db.get(`sa-as_${message.guild.id}`);
if (args[0] == "aç" || args[0] == "ac") {
if (kufur) {

return message.reply(`${basarisiz} ${message.author}, Görünüşe göre sa-as sistemi zaten aktif!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    } else {
      await db.set(`sa-as_${message.guild.id}`, "Açık");


return message.reply(`${basari} ${message.author}, Sa-as sistemi başarıyla açıldı.`).then(x => setTimeout(() => {x.delete()}, 5000));
message.react('✅')
    }
  } else if (args[0] == "kapat") {
    if (!kufur) {

return message.reply(`${basarisiz} ${message.author}, Görünüşe göre sa-as sistemi zaten kapalı!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    }
    await db.delete(`sa-as_${message.guild.id}`);


return message.reply(`${basari} ${message.author}, Sa-as sistemi başarıyla kapandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
message.react('✅')
  }} else if(message.channel.type === "GROUP_DM") {
  
  if (!args[0]) {
    
return message.reply(`${basarisiz} ${message.author}, Doğru bir argüman gir Aç veya Kapat.`).then(x => setTimeout(() => {x.delete()}, 5000));


    return;
  }
let kufur = await db.get(`sa-as_${message.channel.id}`);
if (args[0] == "aç" || args[0] == "ac") {
if (kufur) {

return message.reply(`${basarisiz} ${message.author}, Görünüşe göre sa-as sistemi zaten aktif!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    } else {
      await db.set(`sa-as_${message.channel.id}`, "Açık");


return message.reply(`${basari} ${message.author}, Sa-as sistemi başarıyla açıldı.`).then(x => setTimeout(() => {x.delete()}, 5000));
message.react('✅')
    }
  } else if (args[0] == "kapat") {
    if (!kufur) {

return message.reply(`${basarisiz} ${message.author}, Görünüşe göre sa-as sistemi zaten kapalı!`).then(x => setTimeout(() => {x.delete()}, 5000));

      return;
    }
    await db.delete(`sa-as_${message.channel.id}`);


return message.reply(`${basari} ${message.author}, Sa-as sistemi başarıyla kapandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
message.react('✅')
  }} else {message.reply(`${basarisiz} ${message.author}, Bu komut sadece sunucuda be gruplarda geçerlidir.`).then(x => setTimeout(() => {x.delete()}, 5000))}


}}
exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "sa-as",
  description: "Sa-As Komutunu Açıp Kapatabilirsiniz.",
  usage: "sa-as <aç/kapat>"
};