const Discord = require('discord.js-selfbot-v13');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

module.exports.run = async (client, message, args) => {
    if (message.author.id === ayarlar.sahip) {
    await message.delete()
      
    message.channel.send(`${basari} ${message.author}, Bot yeniden başlatılıyor...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    db.set(`restart_chid`, msg.channel.id)
    process.exit(0);
  })
    
          
}}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reboot","yeniden-başlat","restart"],
permLevel: 4
};

module.exports.help = {
  name: 'reboot',
  description: 'Botunuzu yeniden başlatır....',
  usage: 'reboot'
};