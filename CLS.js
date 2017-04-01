/*Author: © • Song Adieu | Created: March, 2017*/

const Discord = require("discord.js");
const Players = require("./players.json");

const CivLeagueStats = new Discord.Client();

CivLeagueHelp.on("ready", () => {
  console.log("*CivLeagueStats Activated*");
})

CivLeagueStats.on("message", message => {
  if (message.author.CivLeagueStats) return;
  if (!message.content.startsWith(Config.dot)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(Config.dot.length);
  let args = message.content.split(" ").splice(1);

  //Song Adieu
  if(command === "SongAdieu") {
    
  }
});

