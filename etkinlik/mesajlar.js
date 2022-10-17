const Discord = require("discord.js-selfbot-v13")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports = async message => {

let client = message.client
let afk = await db.fetch(`afk`)
let sebep = await db.fetch(`afk_sebep`)
let süre = await db.fetch(`afk_süre`)
  
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
  
if (message.content === '.unuttum') {
if (message.author.id !== ayarlar.sahip) return 
message.reply({content:`Prefix: \`${db.fetch(`prefix`)}\``})
}
}