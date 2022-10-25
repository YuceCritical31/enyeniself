const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()

let komutlar = ["sil","ayarla","sifirla"]
let linkler = [".webp",".png",".jpeg",".gif",".jpg"]
if(!komutlar.some(word => message.content.includes(word))) return message.channel.send(`${basarisiz} ${message.author}, Yanlış kullanım doğru kullanım şekli: ${await db.get(`prefix`) || ayarlar.prefix}profil-foto <sil/ayarla/sifirla>`).then(x => setTimeout(() => {x.delete()}, 5000))
if (client.user.nitroType !== "NITRO_BOOST") return message.channel.send(`${basarisiz} ${message.author}, Bu komut için \`NITRO BOOST\` a ihtiyacın var.`).then(x => setTimeout(() => {x.delete()}, 5000)) 
  
if (args[0] === "sil") {
message.channel.send(`${basari} ${message.author}, Profil bannerini sildim.`)  
await client.user.setBanner(null)
}
  
if (args[0] === "ayarla") {
try{ 
if (message.attachments.size === 1 && !args[1]) {
message.attachments.forEach(async(x) => {
if (!x.url.endsWith(".jpg") & !x.url.endsWith(".gif") & !x.url.endsWith(".png") & !x.url.endsWith(".jpeg") & !x.url.endsWith(".webp")) return message.channel.send(`${basarisiz} ${message.author}, Bir görsel atmalısın.`).then(x => setTimeout(() => {x.delete()}, 5000))
await db.set(`banner`, x.url)
message.channel.send(`${basari} ${message.author}, Başarıyla profil bannerini aşağıdaki görsel olarak kaydettim.`, new Discord.MessageAttachment(await db.get(`banner`)))
})
}else if (!args[1] && message.attachments.size > 1) {
message.channel.send(`${basarisiz} ${message.author}, En fazla 1 tane görsel belirtmelisin!`).then(x => setTimeout(() => {x.delete()}, 5000))
}
 
if (message.attachments.size === 0 && !args[1]) return message.channel.send(`${basarisiz} ${message.author}, Bir görsel linki belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000))

if (args[1]) {
if (!linkler.some(word => message.content.endsWith(word))) return message.channel.send(`${basarisiz} ${message.author}, Bir görsel linki belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000))
//message.channel.send(`${basari} ${message.author}, Profil banneriniz ayarlandı.`)  
await db.set(`banner`, args[1])
message.channel.send({content:`${basari} ${message.author}, Başarıyla profil bannerini aşağıdaki görsel olarak kaydettim.`, files:[await db.get(`banner`)]  })
}}catch{
message.channel.send(`${basarisiz} ${message.author}, Bu dosya/link bir görsel dosyası/linki değil!`).then(x => setTimeout(() => {x.delete()}, 5000))
}}
  
if (args[0] === "sifirla") {
try{
if (!await db.get(`banner`)) return message.channel.send(`${basarisiz} ${message.author}, Profil fotoğrafı ayarlanmamış!`).then(x => setTimeout(() => {x.delete()}, 5000))
await client.user.setBanner(await db.get(`banner`))
message.channel.send(`${basari} ${message.author}, Başarıyla profil bannerini sıfırladım.`)
}catch{
message.channel.send(`${basarisiz} ${message.author}, Bannerini çok hızlı değişiyosun veya ayarlanan link hatalı!`).then(x => setTimeout(() => {x.delete()}, 5000))
}}

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banner-foto"],
  permLevel: 4
};

exports.help = {
  name: "bf",
  description: "",
  usage: ""
};