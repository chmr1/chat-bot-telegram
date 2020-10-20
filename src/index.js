const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./lib/dialogflow');
const youtube = require('./lib/youtube');
const config = require('./config/telegram.json')

const bot = new TelegramBot(config.token, { polling: true });

bot.on('message', async function(msg) {
    const chatId = msg.chat.id;
    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;
    if (dfResponse.intent == 'Treino específico'){
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});