const { Botkit } = require('botkit');
const { SlackAdapter, SlackMessageTypeMiddleware, SlackEventMiddleware } = require('botbuilder-adapter-slack');
const axios = require('axios'); // Import axios for API calls
const faqs = require('./faqs'); // Import the FAQs

const adapter = new SlackAdapter({
    clientSigningSecret: 'cc6d98cb800871ad721b13fa1654ec1b',
    botToken: 'xoxb-7596320426835-7596814142226-l3w5Qz5cGyTigTSMEytVZhMg',
});

// Add Slack-specific middlewares
adapter.use(new SlackEventMiddleware());
adapter.use(new SlackMessageTypeMiddleware());

const controller = new Botkit({
    adapter: adapter,
    // Uncomment and configure a storage adapter if you need persistent storage
    // storage: myStorageAdapter
});

// Handle messages and integrate with API
controller.on(['message', 'direct_message', 'direct_mention'], async (bot, message) => {
    const userMessage = message.text.toLowerCase();

    // Check FAQ responses
    const faq = faqs.find(faq => faq.keywords.some(keyword => userMessage.includes(keyword)));
    if (faq) {
        await bot.reply(message, faq.response);
        return;
    }

    // Handle API requests based on user input
    try {
        let apiResponse;
        if (userMessage.includes('items')) {
            // Fetch data from your Java API
            apiResponse = await axios.get('http://localhost:8080/api/items'); // Your API endpoint for items

            if (apiResponse.data && Array.isArray(apiResponse.data)) {
                // Format the response to display item details
                const itemDetails = apiResponse.data.map(item => {
                    return `ID: ${item.id}, Name: ${item.name}, Category: ${item.category}`;
                }).join('\n');

                await bot.reply(message, `Here are the items:\n${itemDetails}`);
            } else {
                await bot.reply(message, 'No items found.');
            }
        } else if (userMessage.includes('users')) {
            apiResponse = await axios.get('http://localhost:8080/api/users'); // Your API endpoint for users
            if (apiResponse.data) {
                await bot.reply(message, `Here are the users: ${apiResponse.data.join(', ')}`);
            }
        } else {
            await bot.reply(message, "I'm here to help with product FAQs. Please ask your question.");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        await bot.reply(message, "An error occurred while fetching data.");
    }
});
