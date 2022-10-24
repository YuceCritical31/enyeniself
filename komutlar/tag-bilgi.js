const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;

exports.run = async(client, message, args) => {
if (message.author.id === ayarlar.sahip) {

let tag = args.slice(0).join(" ")
if(!tag) return message.reply(`${basarisiz} ${message.author}, Bir tag belirt!`).then(x => setTimeout(() => {x.delete()}, 5000))
let sonuc = message.guild.members.cache.filter(mr => mr.user.username.includes(tag)).size

message.reply(`${basari} ${message.author}, Belirtilen taga sahip bu sunucuda `+ `**${sonuc}**` +` kişi var!`)
message.react('✅')
}}
exports.conf = {
aliases: ["tag-bilgi","tag-bul"]
}

exports.help = {
name: "tag-info"
};