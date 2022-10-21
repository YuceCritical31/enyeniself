const translate = require('google-translate-api');

 if (cmd === "translate") {
        let translateme = args.slice(0).join(" ")
        translate(translateme, { to: config.translate }).then(res => {
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Translate").setColor("#00C5FF").setDescription("From - ** " + res.from.language.iso + "**\nTo - ** " + config.translate + "**\nInput - **" + translateme + "**\nOutput :arrow_down:```" + res.text + "```").setFooter("Powered by Google") })
        }).catch(err => {
            msg.edit(":x: An error has occurred. Details: " + err)
        });
    }