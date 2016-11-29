const Botkit = require('botkit');
const fs = require('fs');

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token
}).startRTM(function(err){
    if (err) {
        throw new Error(err);
    }
});

controller.hears('jpgちょうだい',['direct_message','direct_mention','mention'],function(bot,message) {
    const messageObj = {
        file: fs.createReadStream('./hoge.jpg'),
        filename: 'hoge.jpg',
        title: 'hoge.jpg',
        channels: message.channel
    };

    bot.api.files.upload(messageObj, function(err, res){
        if(err){
            console.log(err);
        }
    });
});

controller.hears('txtちょうだい',['direct_message','direct_mention','mention'],function(bot,message) {
    const messageObj = {
        file: fs.createReadStream('./hoge.txt'),
        filename: 'hoge.txt',
        title: 'hoge.txt',
        channels: message.channel
    };

    bot.api.files.upload(messageObj, function(err, res){
        if(err){
            console.log(err);
        }
    });
});
