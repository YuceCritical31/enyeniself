const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");
const Canvas = require('canvas')
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async(client, message, args) => {
  
if (![client.user.id].includes(message.author.id)) return
await message.delete()
  
    const canvas = Canvas.createCanvas(600, 250)
    const ctx = canvas.getContext("2d")

    const target = message.mentions.users.first()
    const target2 = message.mentions.users.map(x => x)[1]

    let target3
    if (target2) {target3 = target2} else {target3 = message.author}
    
    if(!target || target.id === message.author.id) return message.channel.send(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1033078714432503858/1034217917786632262/unknown.png")
    
    
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

  
    const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL( { format: "png" } ))
    const avatar = await Canvas.loadImage(target3.displayAvatarURL( { format: 'png' } ))
    ctx.drawImage(TargetAvatar, 25, 100, 125, 125)
    ctx.drawImage(avatar, 450, 100, 125, 125)
  
    const random = Math.floor(Math.random() * 99) + 1

    if(random < 10) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

    } else if(random >= 10 && random < 20) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 20 && random < 30) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 30 && random < 40) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: 
`, files:[attachment]})

} else if(random >= 40 && random < 50) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :heart: :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 50 && random < 60) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :heart: :heart: :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 60 && random < 70) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 70 && random < 80) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 80 && random < 90) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :heart: :heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 90 && random < 99) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :heart: :heart: :black_heart:
`, files:[attachment]})

} else if(random >= 99) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.channel.send({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:${target3}
:small_red_triangle:${target}
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :heart: :heart: :heart:
`, files:[attachment]})

}
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "ship",
  description: "Aşk Ölçer.",
  usage: "ship <etiket>"
};