'use strict';

const TelegramBot = require('node-telegram-bot-api');
const {TELEGRAM_BOT_API_TOKEN, TELEGRAM_BOT_CHAT_ID} = process.env;

const token = TELEGRAM_BOT_API_TOKEN;
const chatId = TELEGRAM_BOT_CHAT_ID;

const bot = new TelegramBot(token, {polling: true});

const teleBot = (cMsg) => {
  console.log('send msg to telegram ...');
  bot.sendMessage(chatId, cMsg);
};

module.exports = {teleBot: teleBot};
