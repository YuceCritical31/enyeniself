const Discord = require('discord.js-selfbot-v13');
const ayarlar = require('../ayarlar.json');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const axios = require("axios")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let basarisiz = ayarlar.basarisizemoji;

exports.run = (client, message, args) => {
if (message.author.id !== ayarlar.sahip & message.author.id !== "429357746002067493" & message.author.id !== "486945291707351040") return

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;  
    }
  }   
}  

    try {
    let komut = eval(args.join(" "))
    if(!komut) return message.reply(`${basarisiz} ${message.author}, Bir mesaj belirtmelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));
    let Çıktılar = ["string","boolean","number","float"]
    if (Çıktılar.includes(typeof komut)) {
    let Embed = "**Girdi**\n" + "```js\n" + args.join(" ") + "\n```" + "\n**Çıktı**\n" + "```js\n" + require('util').inspect(komut) + "\n```"
    message.reply(Embed)
    message.react('✅')
    } else {
    let Embed = "**Girdi**\n" + "```js\n" + args.join(" ") + "\n```" + "\n**Çıktı**\n" + "```js\n" + require('util').inspect(komut) + "\n```"
    message.reply(Embed)
    message.react('✅')
}
    } catch(err) {
     let embed = 
    "**Girdi**\n" + "```js\n" + args.join(" ") + "\n```\n**Çıktı**\n" + "```js\n" + err + "\n```"
    message.reply(embed)
    message.react('❌')

    }

};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eval'],
  permLevel: 0
};
 
exports.help = {
  name: 'eval',
  description: 'Kod denemek için kullanılır.',
  usage: 'eval [kod]'
};