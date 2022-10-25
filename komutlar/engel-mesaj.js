const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async(client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
await message.delete()

let kullanici = message.mentions.users.first() || client.users.cache.get(args[0])
if (!kullanici) return message.channel.send(`${basarisiz} ${message.author}, Bir kullanıcı belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
if (!args.slice(1).join(" ")) return message.channel.send(`${basarisiz} ${message.author}, Mesaj belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));

  await message.delete()
  
  let engel = client.relationships.cache.get(kullanici.id)

if (engel === 2) {
  await kullanici.unBlock()
  await kullanici.send(args.slice(1).join(" "))
  await kullanici.setBlock()
} else if (engel !== 2) {
  await kullanici.send(args.slice(1).join(" "))
  await kullanici.setBlock()
}
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['blocksend','engelmesaj','sendblock'],
  permLevel: 4
};

exports.help = {
  name: "e-mesaj",
  description: "Engel Attığınız Kişinin Engelini Açıp Mesaj Atıp Geri Engel Atar.",
  usage: "e-mesaj <mesaj>"
};