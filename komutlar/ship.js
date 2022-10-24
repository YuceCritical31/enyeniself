const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");
const Canvas = require('canvas')
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async(client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
    const canvas = Canvas.createCanvas(600, 250)
    const ctx = canvas.getContext("2d")

    const target = message.mentions.users.first()
    const target2 = message.mentions.users.map(x => x)[1]
    console.log(target2)
    if(!target || target.id === message.author.id) return message.reply(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1033078714432503858/1034217917786632262/unknown.png")
    
    
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

  

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL( { format: 'png' } ))
    ctx.drawImage(avatar, 25, 100, 125, 125)

    const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL( { format: "png" } ))
    ctx.drawImage(TargetAvatar, 450, 100, 125, 125)
  
    const random = Math.floor(Math.random() * 99) + 1

    if(random < 10) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

    } else if(random >= 10 && random < 20) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 20 && random < 30) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 30 && random < 40) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: 
`, files:[attachment]})

} else if(random >= 40 && random < 50) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :heart: :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 50 && random < 60) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :heart: :heart: :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 60 && random < 70) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :black_heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 70 && random < 80) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :heart: :black_heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 80 && random < 90) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :heart: :heart: :black_heart: :black_heart:
`, files:[attachment]})

} else if(random >= 90 && random < 99) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :heart: :heart: :black_heart:
`, files:[attachment]})

} else if(random >= 99) {
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`
:heartpulse: **EŞLEŞME** :heartpulse:
:small_red_triangle_down:*\`${message.author.username}\`*
:small_red_triangle:*\`${target.username}\`*
**${random}%** :heart: :heart: :heart: :heart: :heart: :heart: :heart: :heart: :heart:
`, files:[attachment]})

}
  
  
}};

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