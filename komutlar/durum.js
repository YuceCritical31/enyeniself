const Discord = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
  
  const sayılar = ["name","state","type","details","url","assets","appid","sifirla","ayarla","kapat","aç"]
  if(!sayılar.some(word => message.content.includes(word)) || !args[0]) return message.reply(`${basarisiz} ${message.author}, Dogru bi komut gir ${await db.get("prefix") || ayarlar.prefix}durum <name/state/type/details/url/assets/appid/sifirla/ayarla/aç/kapat>`).then(x => setTimeout(() => {x.delete()}, 10000))
  
if (args[0].toLowerCase() === "name") {  
let data = await db.get(`durum`)
let durum = args.splice(1).join(" ")
if(!durum) return message.reply({content:`${basarisiz} ${message.author}, Lütfen durumunuzu belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === durum) return message.reply(`${basarisiz} ${message.author}, Durumunuz önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
 
message.reply({content:`${basari} ${message.author}, Durumunuz \`${durum}\` olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`durum`, durum)
message.react('✅')
}

if (args[0].toLowerCase() === "state") {  
let data = await db.get(`state`)
let durum = args.splice(1).join(" ")
if(!durum) return message.reply({content:`${basarisiz} ${message.author}, Lütfen state belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === durum) return message.reply(`${basarisiz} ${message.author}, State önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
 
message.reply({content:`${basari} ${message.author}, State \`${durum}\` olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`state`, durum)
message.react('✅')
}
  
if (args[0].toLowerCase() === "details") {  
let data = await db.get(`details`)
let durum = args.splice(1).join(" ")
if(!durum) return message.reply({content:`${basarisiz} ${message.author}, Lütfen details belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === durum) return message.reply(`${basarisiz} ${message.author}, Details önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
 
message.reply({content:`${basari} ${message.author}, Details \`${durum}\` olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`details`, durum)
message.react('✅')
}
  
if (args[0].toLowerCase() === "url") {  
let data = await db.get(`url`)
let durum = args.splice(1).join(" ")
if (!durum.startsWith("http")) return message.reply({content:`${basarisiz} ${message.author}, Lütfen url belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if(!durum) return message.reply({content:`${basarisiz} ${message.author}, Lütfen url belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === durum) return message.reply(`${basarisiz} ${message.author}, Url önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
 
message.reply({content:`${basari} ${message.author}, Url \`${durum}\` olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`url`, durum)
message.react('✅')
}
  
if (args[0].toLowerCase() === "assets") {
 
  const sayılar = ["limage","simage","stext","ltext"]
  if(!sayılar.some(word => message.content.includes(word))) return message.reply(`${basarisiz} ${message.author}, Dogru bi komut gir ${await db.get("prefix") || ayarlar.prefix}assets <limage/ltext/simage/stext>`).then(x => setTimeout(() => {x.delete()}, 10000))
  
if (args[1].toLowerCase() === "limage") {
let data = await db.get(`limage`)
let durum = args.splice(2).join(" ")
if (!durum.startsWith("http")) return message.reply({content:`${basarisiz} ${message.author}, Lütfen large image i link olarak belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if(!durum) return message.reply({content:`${basarisiz} ${message.author}, Lütfen large image belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === durum) return message.reply(`${basarisiz} ${message.author}, Large image önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
 
  durum = durum
        .replace('https://cdn.discordapp.com/', 'mp:')
        .replace('http://cdn.discordapp.com/', 'mp:')
        .replace('https://media.discordapp.net/', 'mp:')
        .replace('http://media.discordapp.net/', 'mp:');
  
message.reply({content:`${basari} ${message.author}, Large image \`${durum}\` olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`limage`, durum)
message.react('✅')
} else if (args[1].toLowerCase() === "simage") {
let data = await db.get(`simage`)
let durum = args.splice(2).join(" ")
if (!durum.startsWith("http")) return message.reply({content:`${basarisiz} ${message.author}, Lütfen small image i link olarak belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if(!durum) return message.reply({content:`${basarisiz} ${message.author}, Lütfen small image belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === durum) return message.reply(`${basarisiz} ${message.author}, Large image önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
 
  durum = durum
        .replace('https://cdn.discordapp.com/', 'mp:')
        .replace('http://cdn.discordapp.com/', 'mp:')
        .replace('https://media.discordapp.net/', 'mp:')
        .replace('http://media.discordapp.net/', 'mp:');
  
message.reply({content:`${basari} ${message.author}, Small image \`${durum}\` olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`simage`, durum)
message.react('✅')
} else if (args[1].toLowerCase() === "ltext") {
let data = await db.get(`ltext`)
let durum = args.splice(2).join(" ")
if(!durum) return message.reply({content:`${basarisiz} ${message.author}, Lütfen large text belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === durum) return message.reply(`${basarisiz} ${message.author}, Large text önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
message.reply({content:`${basari} ${message.author}, Large text \`${durum}\` olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`ltext`, durum)
message.react('✅')
} else if (args[1].toLowerCase() === "stext") {
let data = await db.get(`stext`)
let durum = args.splice(2).join(" ")
if(!durum) return message.reply({content:`${basarisiz} ${message.author}, Lütfen small text belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === durum) return message.reply(`${basarisiz} ${message.author}, Small text önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
  
message.reply({content:`${basari} ${message.author}, Small text \`${durum}\` olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`stext`, durum)
message.react('✅')
}
}
  
if (args[0].toLowerCase() === "sifirla") {  

if (args[1]) {
const sayılar = ["limage","simage","stext","ltext","assets","name","state","appid","url"]
if(!sayılar.some(word => message.content.includes(word))) return message.reply(`${basarisiz} ${message.author}, Dogru bi komut gir ${await db.get("prefix") || ayarlar.prefix}durum sifirla <name/state/type/details/url/assets/appid/limage/ltext/simage/stext>`).then(x => setTimeout(() => {x.delete()}, 10000))
  
if (args[1].toLowerCase() === "details") {
await db.delete(`details`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, Details sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
} else if (args[1].toLowerCase() === "state") {
await db.delete(`state`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, State sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
} else if (args[1].toLowerCase() === "name") {
await db.delete(`durum`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, Name sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
} else if (args[1].toLowerCase() === "url") {
await db.delete(`url`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, Url sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
} else if (args[1].toLowerCase() === "appid") {
await db.delete(`appid`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, App id sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
} else if (args[1].toLowerCase() === "ltext") {
await db.delete(`ltext`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, Large text sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
} else if (args[1].toLowerCase() === "limage") {
await db.delete(`limage`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, Large image sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
} else if (args[1].toLowerCase() === "stext") {
await db.delete(`stext`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, Small text sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
} else if (args[1].toLowerCase() === "simage") {
await db.delete(`simage`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, Small image sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
} else if (args[1].toLowerCase() === "assets") {
await db.delete(`ltext`)
await db.delete(`limage`)
await db.delete(`stext`)
await db.delete(`simage`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, Tüm assets ler sıfırlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
}
} else {
let data = await db.get(`durum`)
if (!data) return message.reply(`${basarisiz} ${message.author}, Durumunuz zaten sıfırlanmış.`).then(x => setTimeout(() => {x.delete()}, 5000));

await db.delete(`durum`)
await db.delete(`url`)
await db.delete(`details`)
await db.delete(`appid`)
await db.delete(`state`)
await db.delete(`limage`)
await db.delete(`simage`)
await db.delete(`ltext`)
await db.delete(`stext`)
message.react('✅')  
  
message.reply(`${basari} ${message.author}, Durumunuz sıfırlanıyor biraz bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
}
}
  
if (args[0].toLowerCase() === "appid") {  
let data = await db.get(`appid`)
let durum = args.splice(1).join(" ")
if (isNaN(durum)) return message.reply({content:`${basarisiz} ${message.author}, Lütfen application id belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if(!durum) return message.reply({content:`${basarisiz} ${message.author}, Lütfen application id belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
if (data === durum) return message.reply(`${basarisiz} ${message.author}, Url önceki ile aynı olamaz.`).then(x => setTimeout(() => {x.delete()}, 5000))
 
message.reply({content:`${basari} ${message.author}, App id \`${durum}\` olarak ayarlandı.`}).then(x => setTimeout(() => {x.delete()}, 5000));
  
await db.set(`appid`, durum)
message.react('✅')
}
  
if (args[0].toLowerCase() === "type") {  
let sayılar = ["1","2","3","4"]
let data = await db.get(`type`)
let status = args[1]
if(!status) return message.reply(`${basarisiz} ${message.author}, Lütfen durum şeklinizi belirtiniz.\n1 = Oynuyor\n2 = İzliyor\n3 = Dinliyor\n4 = Yayında`)
if(!sayılar.some(word => message.content.includes(word))) return message.reply(`${basarisiz} ${message.author}, Lütfen aşağıdaki sayılardan belirtiniz.\n1 = Oynuyor\n2 = İzliyor\n3 = Dinliyor\n4 = Yayında`)
  
if (status === "1"){
await db.set(`type`, "PLAYING")
status = "Oynuyor"
}
  
if (status === "2"){
await db.set(`type`, "WATCHING")
status = "İzliyor"
}

if (status === "3"){
await db.set(`type`, "LISTENING")
status = "Dinliyor"
}
  
if (status === "4"){
await db.set(`type`, "STREAMING")
status = "Yayında"
}

message.reply(`${basari} ${message.author}, Durum şekiliniz \`${status}\` olarak ayarlandı.`).then(x => setTimeout(() => {x.delete()}, 5000));
message.react('✅')
}
  
if (args[0].toLowerCase() === "ayarla") {
  let data = await db.get(`type`) || "PLAYING"
  
if (data === "PLAYING" || data === "WATCHING" || data === "LISTENING") {
  if (!await db.get(`durum`)) return message.reply({content:`${basarisiz} ${message.author}, Lütfen durum name belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))

message.react('✅')   
message.reply(`${basari} ${message.author}, Durumunuz ayarlanıyor lütfen bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })  
} else if (data === "STREAMING") {
  if (!await db.get(`durum`)) return message.reply({content:`${basarisiz} ${message.author}, Lütfen durum name belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))
  if (!await db.get(`durum`)) return message.reply({content:`${basarisiz} ${message.author}, Lütfen durum url belirtiniz.`}).then(x => setTimeout(() => {x.delete()}, 5000))

message.react('✅')   
message.reply(`${basari} ${message.author}, Durumunuz ayarlanıyor lütfen bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
} 
}
  
if (args[0].toLowerCase() === "kapat") {
  
let data = await db.get("durumonoff")
if (!data) return message.reply(`${basarisiz} ${message.author}, Durumunuz zaten kapanmış.`).then(x => setTimeout(() => {x.delete()}, 5000));

await db.delete("durumonoff")
message.react('✅')   
message.reply(`${basari} ${message.author}, Durumunuz kapatılıyor lütfen bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
}
  
if (args[0].toLowerCase() === "aç") {
  
let data = await db.get("durumonoff")
if (data === "Açik") return message.reply(`${basarisiz} ${message.author}, Durumunuz zaten açık.`).then(x => setTimeout(() => {x.delete()}, 5000));

await db.set("durumonoff", "Açik")
message.react('✅')   
message.reply(`${basari} ${message.author}, Durumunuz açılıyor lütfen bekleyin...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
}

}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["durum-ayar"],
  permLevel: 4
};

exports.help = {
  name: "durum",
  description: "",
  usage: ""
};