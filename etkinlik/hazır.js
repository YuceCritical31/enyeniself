const Discord = require("discord.js-selfbot-v13")
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json")
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const figlet = require("figlet")

module.exports = async client => {
  let şekil = await db.get(`type`) || "PLAYING"
  let status = await db.get(`status`) || "invisible"
  let süre = await db.get(`durum_süresi`) || null
  let durum = await db.get(`durum`) || ayarlar.durum
  let state = await db.get(`state`) || null
  let details = await db.get(`details`) || null
  let appid = await db.get(`appid`) || "1" || null
  let url = await db.get(`url`) || null
  let ltext = await db.get(`ltext`) || null
  let limage = await db.get(`limage`) || null
  let stext = await db.get(`stext`) || null
  let simage = await db.get(`simage`) || null
 
if (await db.get("durumonoff") === "Açik") {
client.user.setPresence({ activities: [{
  name: durum,
  type: şekil,
  application_id: appid,
  url: url,
  state: state,
  details: details,
  //party: { size: [ 1, 9 ], id: Discord.RichPresence.getUUID() },
  timestamps: { start: süre },
  assets: {
    large_image: limage,
    large_text: ltext,
    small_image: simage,
    small_text: stext
  },
 buttons: [ 'Sunucumuz', 'Click For Test GTA VI' ],
 metadata: { button_urls: [ 'https://discord.gg/UPJN8TJycs', 'https://nolur.com' ] }
}], status: status});} else client.user.setPresence({ status: status})
//console.log(r.toJSON())
figlet("Atahan Selfbot v1", function(err, data) {
    if (err) {
        console.log(`Atahan Selfbot v1: ${client.user.tag} ile giriş yapıldı.`);
    } else {
    console.log(data)
    console.log(`${client.user.tag} ile giriş yapıldı.`)}
});

  let reklamkick = await db.get(`ses`)
  if (!reklamkick) return;
  if (reklamkick == "Açık") {

 let kanal =  client.channels.cache.get(await db.get(`seskanal`))
 
 if(!kanal) return

if(kanal.type === "GUILD_VOICE" || kanal.type === "GUILD_STAGE_VOICE") {
      const connection = joinVoiceChannel({
        channelId: kanal.id,
        guildId: kanal.guild.id,
        adapterCreator: kanal.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true
      });
  entersState(connection, VoiceConnectionStatus.Ready, 30000)
  } else if (kanal.type === "GROUP_DM" || kanal.type === "DM") {
      const connection = joinVoiceChannel({
        channelId: kanal.id,
        guildId: null,
        adapterCreator: kanal.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
      });
  entersState(connection, VoiceConnectionStatus.Ready, 30000)
}
  }
}