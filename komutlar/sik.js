const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async (client, message, args) => {
  
  if (message.author.id === ayarlar.sahip) {

    let orospu = message.mentions.users.first() || client.users.cache.get(args[0])
if(!orospu) return message.reply("bir orospu belirt!")
    
message.reply(`${orospu} sikiliyor...`).then(x => {
setTimeout(async() => {
x.edit(`${orospu} adlı orospunun amına başarıyla boşaldım.`)
}, 5000)
})
message.react('✅')
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "sik",
  description: "Bir Kullanıcıyı Siker.",
  usage: "sik <etiket>"
};