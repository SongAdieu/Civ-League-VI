"use strict";
/*Author: ©   Song Adieu | Created: February 17th, 2017*/

const Discord = require("discord.js");
const Config = require("./config.json");

const CivPlayersDrafter = new Discord.Client();
/*Activated*/
CivPlayersDrafter.on("ready", () => {
    console.log("*CivPlayersDrafter Activated*");
});

function shuffleList(listToShuffle) {
    let currentPass = listToShuffle.length;
    let index, temp;

    while (currentPass > 0) {
        index = Math.floor(Math.random() * currentPass);
        currentPass--;

        temp = listToShuffle[currentPass];
        listToShuffle[currentPass] = listToShuffle[index];
        listToShuffle[index] = temp;
    }
    return listToShuffle;
}

let commandHelp = `\n
draft <Players> <Ban-1> <Ban-2> <Ban-n>\n
teamSelect <Teams> <Players Per Team>\n
Examples:\n
To draft a 4 player game with America banned: draft 4 America\n
To draft a 4 player game with no bans: draft 4\n
To draft a 4 player game with OP Civs banned: draft 4 OP\n
To randomly assign players to a 2v2 game: teamSelect 2 2\n
`;

//Array of Players Available
let civArrayTeamer = [
    `*Discord Slot 1*`, //0
    `*Discord Slot 2*`, //1
    `*Discord Slot 3*`, //2
    `*Discord Slot 4*`, //3
    `*Discord Slot 5*`, //4
    `*Discord Slot 6*`, //5
    `*Discord Slot 7*`, //6
    `*Discord Slot 8*`]; //7

//Array of Civilizations Available
let allCivs = {
    America: '<:america:291788587329126402>*America*', //0
    Arabia: '<:arabia:291788624041607170>*Arabia*', //1
    Australia: '<:australia:291788657000710144>*Australia*', //2
    Aztec: '<:aztec:291788693428109322>*Aztec*', //3
    Brazil: '<:brazil:291788717587300353>*Brazil*', //4
    China: '<:china:291788737573027840>*China*', //5
    Egypt: '<:egypt:291788765847093248>*Egypt*', //6
    England: '<:england:291788789079080971>*England*', //7
    France: '<:france:291788812068323330>*France*', //8
    Germany: '<:germany:291788833794818049>*Germany*', //9
    Gorgo: '<:gorgo:291788859736588290>*Greece (**Gorgo**)*', //10
    Pericles: '<:pericles:291789035289182208>*Greece (**Pericles**)*', //11
    India: '<:india:291788886513025034>*India*', //12
    Japan: '<:japanx:291788927424266250>*Japan*', //13
    Kongo: '<:kongo:291788970805952513>*Kongo*', //14
    Norway: '<:norway:291789000954478592>*Norway*', //15
    Poland: '<:poland:291789066301603840>*Poland*', //16
    Rome: '<:rome:291789096244871169>*Rome*', //17
    Russia: '<:russia:291789137424416778>*Russia*', //18
    Scythia: '<:scythia:291789172434272256>*Scythia*', //19
    Spain: '<:spain:291789195691819010>*Spain*', //20
    Sumeria: '<:sumeria:291789223365836813>*Sumeria*', //21
    Macedon: `<:macedon:296313184841891840>*Macedon*`, //22
    Persia: `<:persia:296313246279794689>*Persia*`}; //23

let icons = {
    purple: '<:civIconPurple:291784556489474049>',
    white: '<:civIconWhite:293543789103022080>',
    blue: '<:civIconBlue:296338624855932929>'
};

let teamIcons = [icons['white'], icons['blue'], icons['purple']],
    civsPerPlayer = {2:5, 3:4, 4:3, 5:3, 6:3, 7:3, 8:2};

let OPCivList = ['Australia', 'Macedon', 'Rome', 'Persia', 'Scythia', 'Sumeria'];

CivPlayersDrafter.on("message", message => {
    if (message.author.CivPlayersDrafter) {
        return;
    }
    if (!message.content.startsWith(Config.dot)) {
        return;
    }

    console.log(message.content);
    let command = message.content.slice(Config.dot.length).split(" ");
    console.log(command);
    /*
    Command Format:
    draft <Teams> <Players Per Team> <Ban 1> <Ban 2> <Ban N>
    teamSelect <Teams> <Players Per Team>
    */

    if (['draft', 'teamSelect', 'civList', 'opCivList'].indexOf(command[0]) === -1){
        message.channel.sendMessage('\nInvalid command layout.  Valid commands:\n' + commandHelp);
        return;
    }

    let messageString = "";

    switch(command[0]){
        case 'draft':
            let bans = [];
            if (command.length === 1){
                messageString = '\nInvalid command layout.  Valid commands:\n' + commandHelp;
                break;
            }
            let playerCount = Number(command[1]);
            if (playerCount > 8 || playerCount < 2){
                messageString = '\nInvalid number of players for drafting.';
                break;
            }
            if (command.length > 2){
                // Bans!  Time to handle them.
                bans = command.slice(2);
            }
            let validCivs = [];
            if(bans.indexOf('OP') !== -1){
                // Ban invalid civs
                bans = OPCivList;
            }
            let invalidBans = [];
            for (let banCheckCount = 0; banCheckCount < bans.length; banCheckCount++){
                if(!allCivs.hasOwnProperty(bans[banCheckCount])){
                    invalidBans.push(bans[banCheckCount]);
                }
            }
            if(invalidBans.length !== 0){
                messageString = "\nInvalid ban(s) provided: "+invalidBans.join(", ");
                break;
            }
            if (allCivs.length - bans.length < civsPerPlayer[playerCount] * playerCount){
                messageString = '\nToo many bans provided, please provide less bans';
                break;
            }
            for (let civ in allCivs){
                if(!allCivs.hasOwnProperty(civ)){
                    continue;
                }
                if(bans.indexOf(civ) !== -1){
                    continue;
                }
                validCivs.push(allCivs.civ);
            }
            let randomCivs = shuffleList(validCivs);
            messageString += '\n•|• **__Player Choices__** •|•';
            let playerCounter = 0;
            while (playerCounter < playerCount){
                let civCounter = 0;
                let playerID = playerCounter + 1;
                messageString += '\n**'+playerID+'**';
                while(civCounter < civsPerPlayer[playerCount]){
                    messageString += ' ' + randomCivs.pop();
                    civCounter += 1;
                }
                playerCounter += 1;
            }
            break;
        case 'teamSelect':
            if (command.length !== 3){
                messageString = '\nInvalid command layout.  Valid commands:\n' + commandHelp;
                break;
            }
            if (command[1] * command[2] > 8){
                messageString = '\nInvalid number of players for team generation.';
                break;
            }
            let civTeamDrafter = shuffleList(civArrayTeamer);
            let title = 'Teamer Draft ('+command[2]+'v'+command[2]+')', teamMembers = command[2], teams = command[1];
            if (teams === 3) {
                title = 'Teamer Draft (' + teamMembers + 'v' + teamMembers + 'v' + teamMembers + ')';
            }
            messageString += '\n•|• **__' + title + '__** •|•\n*Based on Discord Placement in the Staging Teamer Voice Lobby.*';
            let teamMemberCounter = 0, teamCounter = 0;
            while (teamCounter < teams) {
                let teamID = teamCounter + 1;
                messageString += '\n\n  | **Team ' + teamID + ' ' + teamIcons[teamCounter] + '** |';
                while (teamMemberCounter < teamMembers) {
                    messageString += '\n    •' + civTeamDrafter.pop();
                    teamMemberCounter += 1;
                }
                teamCounter += 1;
            }
            break;
        case 'civList':
            messageString = '\nThe current civ list is as follows: ' + allCivs.keys().join(', ');
            break;
        case 'opCivList':
            messageString = '\nThe current OP civ list is as follows: ' + OPCivList.join(', ');
            break;
    }
    message.channel.sendMessage(messageString);
});

CivPlayersDrafter.login(Config.tokens.draftBot);
