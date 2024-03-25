const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
require('dotenv').config();
const { commandHandler, eventHandler, registerCommands } = require('./utils/handler');

const { BOT_TOKEN } = process.env;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});


client.commands = new Collection();


client.login(BOT_TOKEN)
    .then(() => {
        console.log('Login as '+ client.user.tag);
        // Register all commands, events.
        commandHandler(client);
        eventHandler(client);
        registerCommands(client);
    })
    .catch(error => {
        console.error('Error:', error);
    });
