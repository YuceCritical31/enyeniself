const Discord = require('discord.js-selfbot-v13')
const { QuickDB } = require('quick.db');
const data = new QuickDB()
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;

   exports.run = async(client, message, args) => {
     if (message.author.id === ayarlar.sahip) {
if (message.channel.type === "GUILD_TEXT") {
    let emirhan = await data.fetch(`snipe.id.${message.guild.id}`)
    if(!emirhan) {
    let embeds = `${basarisiz} ${message.author}, Mesaj bulunamadı!`
    message.reply(embeds).then(x => setTimeout(() => {x.delete()}, 5000))
    message.delete()
          } else {
  let kullanıcı = message.guild.members.cache.get(emirhan)
  let silinen = await data.fetch(`snipe.mesaj.${message.guild.id}`)
  let embed = `**${kullanıcı.user.username}#${kullanıcı.user.discriminator}:** ${silinen}`
  message.reply(embed)
  message.react('✅')  
          }} else if (message.channel.type === "DM") {
    let emirhan = await data.fetch(`snipe.iddm.${message.channel.id}`)
    if(!emirhan) {
    let embeds = `${basarisiz} ${message.author}, Mesaj bulunamadı!`
    message.reply(embeds).then(x => setTimeout(() => {x.delete()}, 5000))
    message.delete()
          } else {
  let kullanıcı = client.users.cache.get(emirhan)
  let silinen = await data.fetch(`snipe.mesajdm.${message.channel.id}`)
  let embed = `**${kullanıcı.username}#${kullanıcı.discriminator}:** ${silinen}`
  message.reply(embed)
  message.react('✅')  
          }} else if (message.channel.type === "GROUP_DM") {
    let emirhan = await data.fetch(`snipe.idgdm.${message.channel.id}`)
    if(!emirhan) {
    let embeds = `${basarisiz} ${message.author}, Mesaj bulunamadı!`
    message.reply(embeds).then(x => setTimeout(() => {x.delete()}, 5000))
    message.delete()
          } else {
  let kullanıcı = client.users.cache.get(emirhan)
  let silinen = await data.fetch(`snipe.mesajgdm.${message.channel.id}`)
  let embed = `**${kullanıcı.username}#${kullanıcı.discriminator}:** ${silinen}`
  message.reply(embed)
  message.react('✅')  
          }} 
}}
exports.conf = {
    enabled:true,
    aliases: []
}
exports.help = {
  name: "snipe",
  description: 'Son silinen mesajı yakalar.',
  usage: 'snipe'
} 