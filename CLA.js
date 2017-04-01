"use strict";
/*Author: © • Song Adieu | Created: February 17th, 2017*/

const Discord = require("discord.js");
const Config = require("./config.json");

const CivPlayersAdmin = new Discord.Client();

function cmdIS(str, msg) {
    return msg.content.toLowerCase().startsWith("." + str);
}
function pluck(array) {
    return array.map(function (item) {
        return item["name"];
    });
}
function hasRole(mem, role) {
    return pluck(mem.roles).includes(role);
}

CivPlayersAdmin.on("ready", () => {
    console.log("*CivPlayersAdmin Activated*");
});

CivPlayersAdmin.on('message', message => {
    let args = message.content.split(/[ ]+/);

    /*List of Commands*/
    if (cmdIS("clear", message)) {
        if (hasRole(message.member, "Admin")) {
            if (args.length >= 3) {
                message.channel.sendMessage(`You defined too many Args. '.clear (Number of Messages to Delete.)'`);
            } else {
                let msg;
                if (args.length === 1) {
                    msg = 2;
                } else {
                    msg = parseInt(args[1]) + 1;
                }
                message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
            }
        } else {
            message.channel.sendMessage('You are not Authorized.');
        }
    }
});

CivPlayersAdmin.login(Config.tokenAdminBot);