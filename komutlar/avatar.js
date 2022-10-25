const Discord = require('discord.js-selfbot-v13');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args)=> {
if (![client.user.id].includes(message.author.id)) return
await message.delete()
//Atahan Tarafından Yapılmıştır
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;
let Atahan = message.mentions.users.first();
let userid;
if(isNaN(args[0])){
  if(!Atahan){
    userid = message.author.id;
  }else{
    userid = Atahan.id;
  }
}else{
  userid = args[0];
}
try{
let user = await client.users.fetch(userid);

let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
if(avatar.endsWith(".gif?size=1024")) {

let embed = user.displayAvatarURL({dynamic: true, size: 1024})
message.channel.send({files: [embed]})

} else {

let embed = user.displayAvatarURL({size: 1024})
message.channel.send({files: [embed]})

}
}catch{
  message.channel.send({content:`${basarisiz} ${message.author}, Hatalı kullanıcı veya ID girdiniz!`}).then(x => setTimeout(() => {x.delete()}, 5000))
  return;
}

}

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['av','pp'],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: '',
  usage: 'avatar [@kullanıcı]'
};