const Discord = require('discord.js-selfbot-v13');
const { QuickDB } = require('quick.db');
const data = new QuickDB()
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

if (message.author.id === ayarlar.sahip) {
//-------------------------------------------------------------------------------\\  
let basarisiz = ayarlar.basarisizemoji
if (message.channel.type === "GUILD_TEXT") {
if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply(`${basarisiz} ${message.author}, Bu sunucuda \`KİCK\` yetkiniz yok.`).then(x => setTimeout(() => {x.delete()}, 5000))   
  
//-------------------------------------------------------------------------------\\


let tumaylar = {
"01": "Ocak",  
"02": "Şubat", 
"03": "Mart",  
"04": "Nisan",  
"05": "Mayıs", 
"06": "Haziran", 
"07": "Temmuz",
"08": "Ağustos", 
"09": "Eylül", 
"10": "Ekim", 
"11": "Kasım", 
"12": "Aralık", 
}
let aylar = tumaylar;  
  

let basari = ayarlar.basariliemoji
let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let sebep = args.splice(1).join(" ")
if(!kullanici) return message.reply(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
if(!kullanici.kickable)return message.reply(`${basarisiz} ${message.author}, Etiketlenen kullanıcı atılamaz.`).then(x => setTimeout(() => {x.delete()}, 5000));
if(kullanici.id === message.guild.ownerId) return message.reply(`${basarisiz} ${message.author}, Sunucu sahibini sunucudan atamazsın.`).then(x => setTimeout(() => {x.delete()}, 5000));
kullanici.kick({reason: sebep})
message.react('✅')
   
message.reply(`${basari} ${message.author}, Başarıyla ${kullanici} adlı kullanıcı sunucudan atıldı.`).then(x => setTimeout(() => {x.delete()}, 5000))
} else if (message.channel.type === "GROUP_DM") {
if (message.channel.owner.id === client.user.id) {  

let basari = ayarlar.basariliemoji
let basarisiz = ayarlar.basarisizemoji
let kullanici = message.mentions.users.first() || message.channel.recipients.get(args[0])
 
if(!kullanici) return message.reply(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
//if (!message.channel.recipients.get(kullanici.id)) return message.reply("Bu üye grupta deil!")
  
await message.channel.removeMember(kullanici.id).then(() => {
  message.reply(`${basari} ${message.author}, Başarıyla ${kullanici} adlı kullanıcı gruptan atıldı.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
})
message.react('✅')
} else {
  message.reply(`${ayarlar.basarisizemoji} ${message.author}, Grup lideri siz deilsiniz.`).then(x => setTimeout(() => {x.delete()}, 5000))
}
}
}}

exports.conf = {
    aliases: ['kickle'],
    permLevel: 4
  };
  
  exports.help = {
    name: 'kick'
  };