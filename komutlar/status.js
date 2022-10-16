const Discord = require("discord.js-selfbot-v13");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
let sayılar = ["1","2","3","4"]
let data = await db.fetch(`status`)
let status = args[0]
if(!status) return message.reply(`${basarisiz} ${message.author}, Lütfen durumunuzu belirtiniz.\n1 = Çevrimiçi\n2 = Boşta\n3 = Rahatsız Etmeyin\n4 = Görünmez`).then(x => setTimeout(() => {x.delete()}, 10000))
if(status > 4 || status < 1) return message.reply(`${basarisiz} ${message.author}, Lütfen aşağıdaki sayılardan belirtiniz.\n1 = Çevrimiçi\n2 = Boşta\n3 = Rahatsız Etmeyin\n4 = Görünmez`).then(x => setTimeout(() => {x.delete()}, 10000))
if(isNaN(status)) return message.reply(`${basarisiz} ${message.author}, Lütfen aşağıdaki sayılardan belirtiniz.\n1 = Çevrimiçi\n2 = Boşta\n3 = Rahatsız Etmeyin\n4 = Görünmez`).then(x => setTimeout(() => {x.delete()}, 10000))
  
if (status === "1"){
await db.set(`status`, "online")
await client.settings.setCustomStatus({status: "online"})
await client.settings.setCustomStatus()
status = "Çevrimiçi"
}
  
if (status === "2"){
await db.set(`status`, "idle")
await client.settings.setCustomStatus({status: "idle"})
await client.settings.setCustomStatus()
status = "Boşta"
}

if (status === "3"){
await db.set(`status`, "dnd")
await client.settings.setCustomStatus({status: "dnd"})
await client.settings.setCustomStatus()
status = "Rahatsız Etmeyin"
}

if (status === "4"){
await db.set(`status`, "invisible")
status = "Görünmez"
/*if (client.user.presence.activities[0] && client.user.presence.activities.filter(x => x.type === "CUSTOM")[0].state) {
let durum = client.user.presence.activities.filter(x => x.type === "CUSTOM")[0].state
await client.settings.setCustomStatus({status: "invisible", text: durum})
} else {*/
await client.settings.setCustomStatus({status: "invisible"})
await client.settings.setCustomStatus()
//}
}
  
message.reply(`${basari} ${message.author}, Durumunuz \`${status}\` olarak ayarlandi.`).then(x => setTimeout(() => {x.delete()}, 5000))
message.react('✅')
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["status-ayar","status-ayarla"],
  permLevel: 4
};

exports.help = {
  name: "status",
  description: "",
  usage: ""
};