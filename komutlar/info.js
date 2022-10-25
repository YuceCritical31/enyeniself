const { WebEmbed } = require('discord.js-selfbot-v13');
const ayarlar = require('../ayarlar.json');
const moment = require("moment")

exports.run = async (client, message, args)=> {
if(message.author.id === ayarlar.sahip) {
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

if (await client.users.fetch(userid)) {
  
  let user = await client.users.cache.get(userid)
  let iliski = client.relationships.cache.get(user.id)
  let iliskid 
  if(iliski === 1) {iliskid = "Arkadaş"} else if(iliski === 2) {iliskid = "Engellenmiş"} else if(iliski === 3) {iliskid = "Arkadaşlık İstegi Alınmış"} else iliskid = "Hiçbir Şey"
  
let embed = new WebEmbed()
.setTitle(`${user.tag} Adlı Kullacının Bilgileri`)
.setDescription(`
Kullanıcı adı: ${user.username}

Etiketi: ${user.discriminator}

ID: ${user.id}

Bot mu: ${user.bot ? "Evet" : "Hayır"}

İlişki Durumu: ${iliskid}

Oluşturulduğu Tarih: ${moment(user.createdAt).format("DD/MM/YYYY")}
`)
.setThumbnail(user.displayAvatarURL({dynamic:true}))
.setColor("BLUE")

  
message.channel.send({embeds:[embed]})
}

}catch{ 
  if (client.guilds.cache.get(userid)) {
  
  let sunucu = await client.guilds.cache.get(userid)
  let embed = new WebEmbed()
.setTitle(`${sunucu.name} Adlı Sunucunun Bilgileri`)
.setDescription(`
Sunucu adı: ${sunucu.name}

ID: ${sunucu.id}

Oluşturulduğu Tarih: ${moment(sunucu.createdAt).format("DD/MM/YYYY")}

Toplam Üye Sayısı: ${sunucu.memberCount}

Toplam Kanal Sayısı: ${sunucu.channels.cache.size}

Toplam Rol Sayısı: ${sunucu.roles.cache.size}

Sunucu Sahibi: ${client.users.cache.get(sunucu.ownerId).tag} (${sunucu.ownerId})
`)
.setThumbnail(sunucu.iconURL({dynamic:true}))
.setColor("BLUE")

  
message.channel.send({embeds:[embed]})
} else
  message.channel.send({content:`${basarisiz} ${message.author}, Hatalı kullanıcı veya ID girdiniz!`}).then(x => setTimeout(() => {x.delete()}, 5000))
  return;
}

}}

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bilgi','profil'],
  permLevel: 0
};

exports.help = {
  name: 'info',
  description: '',
  usage: 'info <etiket/kullanıcıid/sunucuid>'
};