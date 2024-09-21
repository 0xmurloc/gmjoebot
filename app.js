/ Function to create an Ethereum wallet
function createEthereumWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

// Handle the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the Ethereum Wallet Creator! Click the button below to create a new wallet.', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Create Wallet', callback_data: 'create_wallet' }
      ]]
    }
  });
});

// Handle button click
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  
  if (callbackQuery.data === 'create_wallet') {
    const wallet = createEthereumWallet();
    
    await bot.sendMessage(chatId, `Your new Ethereum wallet has been created!\n\nAddress: ${wallet.address}\n\nPrivate Key: ${wallet.privateKey}\n\nIMPORTANT: Keep your private key secret and secure!`);
    
    // Offer to create another wallet
    bot.sendMessage(chatId, 'Would you like to create another wallet?', {
      reply_markup: {
        inline_keyboard: [[
          { text: 'Create Another Wallet', callback_data: 'create_wallet' }
        ]]
      }
    });
  }
});

// Start the bot
console.log('Bot is running...');
