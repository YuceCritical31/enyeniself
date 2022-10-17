const Discord = require("discord.js-selfbot-v13")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports = async message => {

let client = message.client
let afk = await db.fetch(`afk`)
let sebep = await db.fetch(`afk_sebep`)
let süre = await db.fetch(`afk_süre`)
  
if (message.content === '.unuttum') {
if (message.author.id === ayarlar.sahip) return 
message.reply({content:`Prefix: \`${db.fetch(`prefix`)}\``})
}
  
if (message.channel.type === "GUILD_TEXT") {

let data = await db.fetch(`sa-as_${message.guild.id}`)

if (data == "Açık") {
if (message.author.id !== client.user.id) return
const reklam4 = ["kötüyüm","kötü sen","çok kötüyüm","kötüyüm sen","kötü","kötüyüm sen","kötü sen","bok gibi","kotu"]
const reklam3 = ["iyiyim sen","iyi sen","iyiyim","iyiyim sağol","çok iyiyim","iyim","iyim sen","iyiyim senden","iyidir senden","iyi","iyidir sen"]
const reklam2 = ["hb","hos bulduk","hos buldum","hoş buldum","hoş bulduk","h.b","hoşbuldum","hosbuldum"]
const reklam = ["sa","selam","selamun aleykum","selamün aleyküm","sea","selamun aleyküm","selamün aleykum","selam aleykum","selam aleyküm","s.a","slm"] 
if (reklam.some(word => message.content.toLowerCase().startsWith(word + " ") || message.content.toLowerCase() === (word))) return message.reply('Aleyküm Selam Hoş Geldin')
//if (reklam.some(word => message.content.toLowerCase() === (word))) return message.reply('Aleyküm Selam Hoş Geldin')
if (reklam2.some(word => message.content.toLowerCase() === (word))) return message.reply('Nasılsın?') 
if (reklam3.some(word => message.content.toLowerCase().startsWith(word))) return message.reply('İyi olmana sevindim hep iyi ol') 
if (reklam4.some(word => message.content.toLowerCase().startsWith(word))) return message.reply('Senin için üzüldüm ne oldu?')
}} else if (message.channel.type === "GROUP_DM") {

let data = await db.fetch(`sa-as_${message.channel.id}`)

if (data == "Açık") {
if (message.author.id === client.user.id) return
const reklam4 = ["kötüyüm","kötü sen","çok kötüyüm","kötüyüm sen","kötü","kötüyüm sen","kötü sen","bok gibi","kotu"]
const reklam3 = ["iyiyim sen","iyi sen","iyiyim","iyiyim sağol","çok iyiyim","iyim","iyim sen","iyiyim senden","iyidir senden","iyi","iyidir sen"]
const reklam2 = ["hb","hos bulduk","hos buldum","hoş buldum","hoş bulduk","h.b","hoşbuldum","hosbuldum"]
const reklam = ["sa","selam","selamun aleykum","selamün aleyküm","sea","selamun aleyküm","selamün aleykum","selam aleykum","selam aleyküm","s.a","slm"] 
if (reklam.some(word => message.content.toLowerCase().startsWith(word + " ") || message.content.toLowerCase() === (word))) return message.reply('Aleyküm Selam Hoş Geldin')
//if (reklam.some(word => message.content.toLowerCase() === (word))) return message.reply('Aleyküm Selam Hoş Geldin')
if (reklam2.some(word => message.content.toLowerCase() === (word))) return message.reply('Nasılsın?') 
if (reklam3.some(word => message.content.toLowerCase().startsWith(word))) return message.reply('İyi olmana sevindim hep iyi ol') 
if (reklam4.some(word => message.content.toLowerCase().startsWith(word))) return message.reply('Senin için üzüldüm ne oldu?')
}}
  
  let reklamkick = await db.fetch(`taklit`)
  if (reklamkick == "Açık") {
  let prefix = await db.fetch(`prefix`) || ayarlar.prefix
const reklam = ["mal","salak","atahan","ben","my","göt","burak","allah","amk","oç","piç","orospu","sik","yuce","aziz","yarra","köpe","bok","kopek","çük","pipi","cük","aşk","ask","apla","abla","kral","kudur","bne","şerefsiz","serefsiz"]//,"send","drop","sell","cf","ws"]

if (message.author.id !== db.fetch(`kurban`)) return;
if (message.author.id === client.user.id) return;
if (message.content.startsWith(ayarlar.basariliemoji)) return message.channel.send(message).then(x => setTimeout(() => {x.delete()}, 5000))
if (message.content.startsWith(ayarlar.basarisizemoji)) return message.channel.send(message).then(x => setTimeout(() => {x.delete()}, 5000))
if (message.content.startsWith(prefix)) return message.reply('Akıllı mısın? Komut kullandırtmam!')
//if (message.content.startsWith('.')) return message.reply('Akıllı mısın? Komut kullandırtmam!')
if (message.content.toLowerCase().startsWith('owo')) return message.reply('Akıllı mısın? Owo mu harcatmam!')
if (message.content.toLowerCase().startsWith('w')) return message.reply('Akıllı mısın? Owo mu harcatmam!')
if (reklam.some(word => message.content.toLowerCase().includes(word))) return message.reply('Kudurma.')

message.channel.send(message)

  }

if (afk === "Açık") {
if (message.author.bot === true) return
if (message.author.id === client.user.id) return
if (message.channel.type === "DM") {

let cooldown = await db.fetch(`spamcıdm_${message.author.id}`)

if (cooldown === "spamcı oç") return
if (!cooldown) {
  message.reply({content:`${client.user}, <t:${süre}:R> **${sebep}** sebebinden AFK moduna girdi lütfen rahatsız etme.`}).then(x => setTimeout(() => {x.delete()}, 30000))
  await db.set(`spamcıdm_${message.author.id}`, "spamcı oç")
  setTimeout(() => {db.delete(`spamcıdm_${message.author.id}`)}, 1200000)
}} else {
if (!message.mentions.users.first()) return
if (message.mentions.users.first().id === client.user.id) {
let cooldown = await db.fetch(`spamcısu_${message.author.id}`)

if (cooldown === "spamcı oç") return
if (!cooldown) {
  message.reply({content:`${client.user}, <t:${süre}:R> **${sebep}** sebebinden AFK moduna girdi lütfen rahatsız etme.`}).then(x => setTimeout(() => {x.delete()}, 30000))
  await db.set(`spamcısu_${message.author.id}`, "spamcı oç")
  setTimeout(() => {db.delete(`spamcısu_${message.author.id}`)}, 1200000)
}}}}
}