let request = require("request");

exports.sendSlackMessage = ( text,channel ) => {
    // let text = "Bye"
    // let channel = "UTBB9EGAV"
    let token   = process.env.slackBotToken 
    let options = { 
        method: 'POST',
        url: process.env.slackPostMessageURL,
        headers: {
             'content-type': 'application/x-www-form-urlencoded',
             'cache-control': 'no-cache',
              accept: 'application/json' 
        },
        form: { 
            token,
            channel ,
            text 
        } 
    };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(body);
    });
};