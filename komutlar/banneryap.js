const Discord = require('discord.js-selfbot-v13');
const ayarlar = require('../ayarlar.json');
const { QuickDB } = require('quick.db');
const db = new QuickDB()

exports.run = async (client, message, args)=> {
if (![client.user.id].includes(message.author.id)) return
await message.delete()
//Atahan Tarafından Yapılmıştır
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;
let linkler = [".webp",".png",".jpeg",".gif",".jpg"]
let Atahan = message.mentions.users.first() || client.users.cache.get(args[0])
  
try{
if (client.user.nitroType !== "NITRO_BOOST") return message.channel.send(`${basarisiz} ${message.author}, Bu komut için \`NITRO BOOST\` a ihtiyacın var.`).then(x => setTimeout(() => {x.delete()}, 5000))
if (message.attachments.size === 1 && !args[0]) {
message.attachments.forEach(x => {
if (!x.url.endsWith(".jpg") & !x.url.endsWith(".gif") & !x.url.endsWith(".png") & !x.url.endsWith(".jpeg") & !x.url.endsWith(".webp")) return message.channel.send(`${basarisiz} ${message.author}, Bir görsel atmalısın.`).then(x => setTimeout(() => {x.delete()}, 5000))
client.user.setBanner(x.url)
message.channel.send({content:`${basari} ${message.author}, Başarıyla banner fotoğrafını aşağıdaki görsel olarak yaptım.`, files:[x.url]})
})
}else if (!args[0] && message.attachments.size > 1) {
message.channel.send(`${basarisiz} ${message.author}, En fazla 1 tane görsel belirtmelisin!`).then(x => setTimeout(() => {x.delete()}, 5000))
}
  
if (message.attachments.size === 0 && !args[0]) return message.channel.send(`${basarisiz} ${message.author}, Bir görsel linki belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000))

if (Atahan) { 
if (!args[0]) return message.channel.send(`${basarisiz} ${message.author}, Bir link veya kullanıcı belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000))
if (Atahan.id === client.user.id) return message.channel.send(`${basarisiz} ${message.author}, Bu komutu sadece diğer üyeler üzerinde kullanabilirsin.`).then(x => setTimeout(() => {x.delete()}, 5000))
await client.users.fetch(Atahan.id, { force: true })
if (!Atahan.bannerURL()) return message.channel.send({content:`${basarisiz} ${message.author}, Kullanıcının banneri yok!`}).then(x => setTimeout(() => {x.delete()}, 5000))
await client.user.setBanner(Atahan.bannerURL({dynamic: true, size: 1024}))
message.channel.send({content:`${basari} ${message.author}, Başarıyla ${Atahan} adlı kullanıcının banner fotoğrafını kopyaladım.`, files:[Atahan.bannerURL({dynamic: true, size: 1024})]})
}else if (message.attachments.size === 0 && args[0]) {
await client.user.setBanner(args[0])
message.channel.send({content:`${basari} ${message.author}, Başarıyla banner fotoğrafını aşağıdaki görsel olarak yaptım.`, files:[args[0]]})
}}catch{
  message.channel.send(`${basarisiz} ${message.author}, Bannerini çok hızlı değişiyorsun veya yanlış kullanıcı/link/görsel giriyosun!`).then(x => setTimeout(() => {x.delete()}, 5000))
}

}
 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bnçal','bannerçal','bnyap'],
  permLevel: 0
};

exports.help = {
  name: 'banneryap',
  description: '',
  usage: 'banneryap [@kullanıcı]'
};