//add module
const TelegramBot = require('node-telegram-bot-api');

//telegram bot token
const token = '782076025:AAF_oyQlg-dbnBbHtUHDK1JPlG4m4sKVVN0';
//const chatId = '336960359'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/event/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome");
});