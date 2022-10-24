const Discord = require('discord.js-selfbot-v13');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji

exports.run = async(client, message, args)=> {
if(message.author.id === ayarlar.sahip) {
try {
  
  
  
}catch{
  message.reply({content:`${basarisiz} ${message.author}, Hatalı kullanıcı veya ID girdiniz!`}).then(x => setTimeout(() => {x.delete()}, 5000))
  return;
}

}}

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gir"],
  permLevel: 0
};

exports.help = {
  name: 'join',
  description: '',
  usage: 'avatar [@kullanıcı]'
};