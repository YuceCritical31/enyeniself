const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()

let data = await db.get(`ses`);
let data2 = await db.get(`seskanal`)

if (message.channel.type === "DM" && !args[0] || message.channel.type === "GROUP_DM" && !args[0] || message.channel.type === "GUILD_VOICE" && !args[0]) {

let kanal = message.channel
if(kanal.id === data2) return message.channel.send(`${basarisiz} ${message.author}, Zaten ayarlı bir ses kanalını tekrar giremezsiniz.`).then(x => setTimeout(() => {x.delete()}, 5000));

if (data) {
message.channel.send(`${basari} ${message.author}, Ses kanalı ${kanal} olarak ayarlanıyor biraz bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
} else if (!data) {
message.channel.send(`${basari} ${message.author}, Ses kanalı ${kanal} olarak ayarlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
}

await db.set(`seskanal`, kanal.id)
}
else {
let kanal = message.mentions.channels.first() || client.channels.cache.get(args[0])
if(!kanal) return message.channel.send(`${basarisiz} ${message.author}, Lütfen bir kanal belirtiniz.`).then(x => setTimeout(() => {x.delete()}, 5000));
if(kanal.id === data2) return message.channel.send(`${basarisiz} ${message.author}, Zaten ayarlı bir ses kanalını tekrar giremezsiniz.`).then(x => setTimeout(() => {x.delete()}, 5000));
if(kanal.type !== "GUILD_VOICE" & kanal.type !== "GUILD_STAGE_VOICE" & kanal.type !== "GROUP_DM" & kanal.type !== "DM") return message.channel.send(`${basarisiz} ${message.author}, Girdiğiniz ${kanal} kanalı bir ses kanalı değil.`).then(x => setTimeout(() => {x.delete()}, 5000));

if (data) {
message.channel.send(`${basari} ${message.author}, Ses kanalı ${kanal} olarak ayarlanıyor biraz bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
} else if (!data) {
message.channel.send(`${basari} ${message.author}, Ses kanalı ${kanal} olarak ayarlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
}

await db.set(`seskanal`, kanal.id)
}}

exports.conf = {
  enabled: true,
  aliases: ["ses-kanali","voice-channel","ses-ayar","ses-ayarla"]
};

exports.help = {
  name: "ses-kanal",
  description: "",
  usage: ""
};