"use strict";
/*Author: © • Song Adieu | Created: February 16th, 2017*/

const Discord = require("discord.js");
const Config = require("./config.json");
const Player = require("./players.json");

const CivLeagueBot = new Discord.Client();

CivLeagueBot.on("ready", () => {
    console.log("*CivLeagueBot Activated*");
});

/*Welcoms Player to the Server*/
CivLeagueBot.on("guildMemberAdd", member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage(
        `${Player.roleAdmin} | ${Player.roleModerator}` + "\n" +
        `**__Just Joined our Server__**` + "\n" +
        `  :hugging: ${member.user} *You have just been hugged! Welcome to **Civilization <:civIcon:291784556489474049> League Community**.*` + "\n" + "\n" +
        `**__Introduction__**` + "\n" +
        `  <#${Config.channelIntroduction}>` + "\n" +
        `    *Our introduction channel is the best place to find all of our links and available commands.*` + "\n" +
        `    **.?**/**.Help** | *Provides a brief description on Channels and Commands right from the <#${Config.channelLobby}>.*`
    );
});
/*Discloses the Player from the Server*/
CivLeagueBot.on("guildMemberRemove", member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage("**__Just Left our Community__**" + "\n" +
        `  :broken_heart: ${member.user}*.. oh no.. just one more turn!*`
    );
});

CivLeagueBot.login(Config.tokenCivilizationVILeagueBot);