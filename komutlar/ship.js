const Discord = require("discord.js-selfbot-v13");
const ayarlar = require("../ayarlar.json");
const Canvas = require('canvas')
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async(client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext("2d")

    const target = message.mentions.users.first()
    if(!target || target.id === message.author.id) return message.reply(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => setTimeout(() => {x.delete()}, 5000));

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/716216765448978504/858442843197669376/PElrfiWeuvQ.png")
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL( { format: 'png' } ))
    ctx.drawImage(avatar, 100, 25, 200, 200)

    const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL( { format: "png" } ))
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200)

    const username = await Canvas.loadImage(message.author.username) 
    ctx.drawImage(username, 400, 25, 200, 200)

    const TargetUsername = await Canvas.loadImage(target.username)
    ctx.drawImage(username, 400, 25, 200, 200)


    const heart = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607217728159744/unknown.png')
    const broken = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607537238179840/unknown.png')
    const random = Math.floor(Math.random() * 99) + 1

    if(random >= 50) {
        ctx.drawImage(heart, 275, 60, 150, 150)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        return message.reply({content:`${message.author.username} + ${target.username} = ${random}%`, files:[attachment]})

    } else {
        ctx.drawImage(broken, 275, 60, 150, 150)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'broken.png')
        return message.reply({content:`${message.author.username} + ${target.username} = ${random}%`, files:[attachment]})

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
  description: "Nitro Olmadan Emoji Atmanızı Sağlar.",
  usage: "emoji <emojiadı>"
};