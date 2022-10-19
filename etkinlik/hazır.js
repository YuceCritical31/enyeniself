const Discord = require("discord.js-selfbot-v13")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = async client => {
  let şekil = await db.fetch(`type`) || "PLAYING"
  let status = await db.fetch(`status`) || "invisible"
  let süre = await db.fetch(`durum_süresi`) || null
  let durum = await db.fetch(`durum`) || ayarlar.durum
  let state = await db.fetch(`state`) || null
  let details = await db.fetch(`details`) || null
  let appid = await db.fetch(`appid`) || "1" || null
  let url = await db.fetch(`url`) || null
  let ltext = await db.fetch(`ltext`) || null
  let limage = await db.fetch(`limage`) || null
  let stext = await db.fetch(`stext`) || null
  let simage = await db.fetch(`simage`) || null
  

const r = new Discord.SpotifyRPC(client)
	.setAssetsLargeImage("spotify:ab67616d00001e02768629f8bc5b39b68797d1bb") // Image ID
	.setAssetsSmallImage("spotify:ab6761610000f178049d8aeae802c96c8208f3b7") // Image ID
	.setAssetsLargeText('未来茶屋 (vol.1)') // Album Name
	.setState('Yunomi; Kizuna AI') // Author
	.setDetails('ロボットハート') // Song name
	.setStartTimestamp(Date.now())
	.setEndTimestamp(Date.now() + 1000 * (2 * 60 + 56)) // Song length = 2m56s
	.setSongId('667eE4CFfNtJloC6Lvmgrx');
 
if (await db.fetch("durumonoff") === "Açik") {
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
console.log(client.user.tag + " ismi ile giriş yapıldı.")

  let reklamkick = await db.fetch(`ses`)
  if (!reklamkick) return;
  if (reklamkick == "Açık") {

 let kanal =  client.channels.cache.get(await db.fetch(`seskanal`))
 
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