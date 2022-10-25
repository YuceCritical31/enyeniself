const Discord = require('discord.js-selfbot-v13')
const { QuickDB } = require('quick.db');
const data = new QuickDB()
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;

   exports.run = async(client, message, args) => {
if (![client.user.id].includes(message.author.id)) return
await message.delete()
     
if (message.channel.type === "GUILD_TEXT") {
    let Atahan = await data.fetch(`snipe.id.${message.guild.id}`)
    if(!Atahan) {
    let embeds = `${basarisiz} ${message.author}, Mesaj bulunamadı!`
    message.channel.send(embeds).then(x => setTimeout(() => {x.delete()}, 5000))
          } else {
  let kullanıcı = message.guild.members.cache.get(Atahan)
  let silinen = await data.fetch(`snipe.mesaj.${message.guild.id}`)
  let embed = `**${kullanıcı.user.username}#${kullanıcı.user.discriminator}:** ${silinen}`
  message.channel.send(embed)  
          }} else if (message.channel.type === "DM") {
    let Atahan = await data.fetch(`snipe.iddm.${message.channel.id}`)
    if(!Atahan) {
    let embeds = `${basarisiz} ${message.author}, Mesaj bulunamadı!`
    message.channel.send(embeds).then(x => setTimeout(() => {x.delete()}, 5000))
          } else {
  let kullanıcı = client.users.cache.get(Atahan)
  let silinen = await data.fetch(`snipe.mesajdm.${message.channel.id}`)
  let embed = `**${kullanıcı.username}#${kullanıcı.discriminator}:** ${silinen}`
  message.channel.send(embed)  
          }} else if (message.channel.type === "GROUP_DM") {
    let Atahan = await data.fetch(`snipe.idgdm.${message.channel.id}`)
    if(!Atahan) {
    let embeds = `${basarisiz} ${message.author}, Mesaj bulunamadı!`
    message.channel.send(embeds).then(x => setTimeout(() => {x.delete()}, 5000))
          } else {
  let kullanıcı = client.users.cache.get(Atahan)
  let silinen = await data.fetch(`snipe.mesajgdm.${message.channel.id}`)
  let embed = `**${kullanıcı.username}#${kullanıcı.discriminator}:** ${silinen}`
  message.channel.send(embed)  
          }} 
}
   
exports.conf = {
    enabled:true,
    aliases: []
}
exports.help = {
  name: "snipe",
  description: 'Son Silinen Mesajı Yakalar.',
  usage: 'snipe'
} 