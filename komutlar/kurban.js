const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async(client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()

let data
let kufur = await db.get(`taklit`);
let kanal2 = client.users.cache.get(args[0])
let kanal = message.mentions.users.first()
if(kanal) {data = kanal.id}
if(kanal2) {data = args[0]}
if(!data) return message.channel.send(`${basarisiz} ${message.author}, Lütfen bir kullanıcı belirtiniz.`).then(x => setTimeout(() => {x.delete()}, 5000));
if(data === client.user.id) return message.channel.send(`${basarisiz} ${message.author}, Kendinizi taklit edemezsiniz!`).then(x => setTimeout(() => {x.delete()}, 5000));
 
message.channel.send(`${basari} ${message.author}, Kurban <@!${data}> olarak ayarlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));

await db.set(`kurban`, data)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "kurban",
  description: "",
  usage: ""
};