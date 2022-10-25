const { MessageEmbed } = require("discord.js-selfbot-v13");
const { QuickDB } = require('quick.db');
const db = new QuickDB()
const ayarlar = require("../ayarlar.json");

let basarili = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji
exports.run = async (client, message, args) => {
  
if (message.author.id === ayarlar.sahip) {

}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "yt",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>"
};



const Discord = require('discord.js');
const chancejs = require('chance');
const chance = new chancejs();

const cevaplar = [
	"Atıyorum: **__TURA__** Geldi",
	"Atıyorum: **__YAZI__** Geldi"
];

exports.run = function(client, message) {
	
	var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
	
	if (cevap === "Atıyorum: **__YAZI__** Geldi") {
		
		 const embedyazı = new Discord.RichEmbed()
		.setColor(0xf4b942)
		.setDescription(cevap)
		.setThumbnail("https://cdn.glitch.com/e08596ec-92ad-46f9-a259-d5306fc43d51%2Fcom.yazi.tura.png?v=1562831231946")
		message.channel.send(embedyazı);
		
	} else if (cevap === "Atıyorum: **__TURA__** Geldi") {
		
		const embedtura = new Discord.RichEmbed()
		.setColor(0xf4b942)
		.setDescription(cevap)
		.setThumbnail("https://cdn.glitch.com/e08596ec-92ad-46f9-a259-d5306fc43d51%2F1TL_reverse.png?v=1562831240074")
		message.channel.send(embedtura);
		
	}
		

};  

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'yazıtura', 
  description: 'Yazı-Tura atar.',
  usage: 'yazıtura'
};