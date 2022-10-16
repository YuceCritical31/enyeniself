const { PermissionsBitField } = require('discord.js-selfbot-v13');
const data = require('quick.db')
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

if (message.author.id === ayarlar.sahip) {
//-------------------------------------------------------------------------------\\  
let basarisiz = ayarlar.basarisizemoji
if (message.channel.type === "GUILD_TEXT") {
if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${basarisiz} ${message.author}, Bu sunucuda \`BAN\` yetkiniz yok.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
  
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
  
if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))){
if(!args[1] || isNaN(args[1])) return message.reply(`${basarisiz} ${message.author}, Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.reply(`**Banlanan Üye:** ${user.tag} (\`${user.id}\`)\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`)).catch(err => message.reply(`${basarisiz} ${message.author}, Belirtilen ID numarasına sahip bir ban bulunamadı!`)).then(x => setTimeout(() => {x.delete()}, 5000));
}

let basari = ayarlar.basariliemoji
let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let sebep = args.splice(1).join(" ")
if(!kullanici) return message.reply(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
if(!kullanici.bannable)return message.reply(`${basarisiz} ${message.author}, Etiketlenen kullanıcı yasaklanamaz.`).then(x => setTimeout(() => {x.delete()}, 5000));
if(kullanici.id === message.guild.ownerId) return message.reply(`${basarisiz} ${message.author}, Sunucu sahibini sunucudan yasaklayamazsın.`).then(x => setTimeout(() => {x.delete()}, 5000));
kullanici.ban({reason: sebep})
message.react('✅')
   
message.reply(`${basari} ${message.author}, Başarıyla ${kullanici} adlı kullanıcı sunucudan yasaklandı.`) 
} else if (message.channel.type === "GROUP_DM") {
if (message.channel.owner.id === client.user.id) {  

let basari = ayarlar.basariliemoji
let basarisiz = ayarlar.basarisizemoji
let kullanici = message.mentions.users.first() || message.channel.recipients.get(args[0])
 
if(!kullanici) return message.reply(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
//if (!message.channel.recipients.get(kullanici.id)) return message.reply("Bu üye grupta deil!")
  
await data.set(`banli_${message.channel.id}_${kullanici.id}`, "banlandin")
await message.channel.removeMember(kullanici.id).then(() => {
  message.reply(`${basari} ${message.author}, Başarıyla ${kullanici} adlı kullanıcı gruptan banlandi.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
})
message.react('✅')
} else {
  message.reply(`${ayarlar.basarisizemoji} ${message.author}, Grup lideri siz deilsiniz.`).then(x => setTimeout(() => {x.delete()}, 5000))
}
}}}

exports.conf = {
    aliases: ['yasakla'],
    permLevel: 4
  };
  
  exports.help = {
    name: 'ban'
  };